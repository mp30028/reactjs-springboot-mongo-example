package com.zonesoft.example.persons.api.controllers;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Comparator;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
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
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import com.zonesoft.example.persons.api.entities.Person;
import com.zonesoft.example.persons.api.services.PersonService;
import com.zonesoft.example.persons.synthetics.builders.PersonBuilder;
import com.zonesoft.example.utils.helpers.MethodInfo;
import com.zonesoft.example.utils.synthetics.SyntheticRecordsGenerator;

@Testcontainers
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
@TestMethodOrder(OrderAnnotation.class)
class PersonsControllerTest {
	private static final Logger LOGGER = LoggerFactory.getLogger(PersonsControllerTest.class);
	private static final String IMAGE_NAME = "mongo:6.0.13";

	@Container
	@ServiceConnection
	private static final MongoDBContainer MONGODB_CONTAINER;
	static {
		MONGODB_CONTAINER = new MongoDBContainer(DockerImageName.parse(IMAGE_NAME)).withReuse(true);
		MONGODB_CONTAINER.start();
	}

	@Autowired private PersonService service;
	@Autowired private WebTestClient testClient;

	@DynamicPropertySource
	static void setProperties(DynamicPropertyRegistry registry) {
		registry.add("spring.data.mongodb.uri", MONGODB_CONTAINER::getReplicaSetUrl);
	}

	@BeforeEach
	void beforeEach() {
		service.deleteAll().subscribe();
	}

	@Test
	@Order(1)
	@DisplayName("Add some records to db then invoke get request and check that all the added records are returned")
	void testGetRequestReturnsAllRecords() {
		SyntheticRecordsGenerator<PersonBuilder, Person> generator = new SyntheticRecordsGenerator<>();
		List<Person> generatedList = generator.generate(() -> new PersonBuilder().withDefaults());
		service.saveAll(generatedList).subscribe();
		List<Person> responseList = 
			testClient
				.get()
				.uri("/api/persons")
				.exchange()
				.expectStatus()
				.isOk()
				.expectBodyList(Person.class)
				.returnResult()
				.getResponseBody();
		LOGGER.debug("{}: responseList={}", MethodInfo.methodName(), responseList);
		LOGGER.debug("{}: size={}", MethodInfo.methodName(), responseList.size());

		Comparator<Person> comparator = new Comparator<Person>() {
			@Override
			public int compare(Person p1, Person p2) {
				return p1.getId().compareTo(p2.getId());
			}
		};
		generatedList.sort(comparator);
		responseList.sort(comparator);
		assertEquals(generatedList.size(), responseList.size());
		assertTrue(generatedList.equals(responseList));
	}

	@Test
	@Order(2)
	@DisplayName("Make sure there are no records in db then invoke get request and check that it return 204 no records")
	void testGetRequestReturn204WhenDbIsEmpty() {
				testClient
					.get()
					.uri("/api/persons")
					.exchange()
					.expectStatus()
					.isNoContent();
	}
}