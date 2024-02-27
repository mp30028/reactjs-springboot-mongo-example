package com.zonesoft.example.persons.api.controllers;

import static io.restassured.module.webtestclient.RestAssuredWebTestClient.given;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import com.zonesoft.example.persons.api.entities.Person;
import com.zonesoft.example.persons.api.services.PersonService;
import com.zonesoft.example.persons.synthetics.builders.PersonBuilder;
import com.zonesoft.example.utils.helpers.MethodInfo;
import com.zonesoft.example.utils.synthetics.SyntheticRecordsGenerator;

import io.restassured.module.webtestclient.response.WebTestClientResponse;

@Testcontainers
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
@TestMethodOrder(OrderAnnotation.class)
class PersonsControllerTest {
	private static final Logger LOGGER =  LoggerFactory.getLogger(PersonsControllerTest.class);
	private static final String IMAGE_NAME = "mongo:6.0.13";
	
    @Container
    @ServiceConnection
	private static final MongoDBContainer MONGODB_CONTAINER;
	static {
		MONGODB_CONTAINER = new MongoDBContainer(DockerImageName.parse(IMAGE_NAME));
		MONGODB_CONTAINER.start();
	}
	
	@Autowired private PersonService service;
	
	@DynamicPropertySource
	static void setProperties(DynamicPropertyRegistry registry) {		
		registry.add("spring.data.mongodb.uri", MONGODB_CONTAINER::getReplicaSetUrl);
	}	
	
	
	@Test
	@Order(1)
	@DisplayName("Add some records to db then invoke get request and check that number of records match")
	void test() {
		SyntheticRecordsGenerator<PersonBuilder, Person> generator = new SyntheticRecordsGenerator<>();
		List<Person> generatedList = generator.generate(() -> new PersonBuilder().withDefaults());
		service.saveAll(generatedList).subscribe();
		WebTestClientResponse wtcResponse =
			given()
				.standaloneSetup(new PersonsController(service))
			.when()
				.get("/api/persons");
				
		assertEquals(200, wtcResponse.statusCode());
		
		//Get the type of list at runtime
			ParameterizedTypeReference<List<Person>> typeRef = new ParameterizedTypeReference<List<Person>>() {};
			List<Person> responseList =  wtcResponse.as(typeRef.getType());
		
		LOGGER.debug("{}: responseBody={}", MethodInfo.methodName(),wtcResponse.body().asString());
		LOGGER.debug("{}: size={}", MethodInfo.methodName(), responseList.size());
		
		assertEquals(generatedList.size(), responseList.size());
	}

}
