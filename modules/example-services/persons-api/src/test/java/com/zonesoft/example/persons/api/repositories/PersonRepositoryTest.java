package com.zonesoft.example.persons.api.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.function.Supplier;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import com.zonesoft.example.persons.api.entities.Person;
import com.zonesoft.example.persons.api.repositories.PersonRepository;
import com.zonesoft.example.persons.synthetics.builders.PersonBuilder;
import com.zonesoft.example.utils.helpers.MethodInfo;
import com.zonesoft.example.utils.synthetics.SyntheticRecordsGenerator;

import reactor.core.publisher.Mono;

@Testcontainers
@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class PersonRepositoryTest {
	private static final Logger LOGGER =  LoggerFactory.getLogger(PersonRepositoryTest.class);
	private static final String IMAGE_NAME = "mongo:6.0.13";	
	private static final MongoDBContainer MONGODB_CONTAINER;
	
	@Autowired private  PersonRepository repository;
	
	static {
		LOGGER.debug("From MONGODB_CONTAINER initialisation");
		MONGODB_CONTAINER = new MongoDBContainer(DockerImageName.parse(IMAGE_NAME));
		MONGODB_CONTAINER.start();
	}
	
	@DynamicPropertySource
	static void setProperties(DynamicPropertyRegistry registry) {		
		registry.add("spring.data.mongodb.uri", MONGODB_CONTAINER::getReplicaSetUrl);
	}	
	
	@Test
	@Order(1)
	@DisplayName("Generate a single Person entity and persist it")
	void simpleSingleRecordTest(){
		Person person = new PersonBuilder().withDefaults().build();
		LOGGER.debug("{}: person={}", MethodInfo.methodName(), person);
		Person savedPerson = repository.save(person).block();
		LOGGER.debug("{}: savedPerson={}", MethodInfo.methodName(), savedPerson);
		assertEquals(person, savedPerson);
	}
	
	@Test
	@Order(2)
	@DisplayName("Generate multiple Persons and persist them")
	void simpleMulitpleRecordsTest() {
		Integer countAtStart = repository.count().block().intValue();
		SyntheticRecordsGenerator<PersonBuilder, Person> builder = new SyntheticRecordsGenerator<PersonBuilder, Person>();
		Supplier<PersonBuilder> personSupplier = (() -> new PersonBuilder().withDefaults());
		List<Person> persons = builder.generate(personSupplier);
		Integer resultsSize =
			repository
				.saveAll(persons)
				.collectList()
				.map(list -> {LOGGER.debug("{}: persons = {}", MethodInfo.methodName(), list); return list;})
				.map(list -> list.size())
				.block();
		LOGGER.debug("{}: results.size={}",MethodInfo.methodName(), resultsSize);
		assertEquals(persons.size(), resultsSize);
		Integer count = repository.count().block().intValue();
		LOGGER.debug("{}: count={}", MethodInfo.methodName() ,count);
		assertEquals(countAtStart + persons.size(), count);
	}
	
	@Test
	@Order(3)
	@DisplayName("Generate a Person, persist it then retrieve it using findById")
	void findByIdTest() {
		Person person = new PersonBuilder().withDefaults().build();
		LOGGER.debug("{}: person={}", MethodInfo.methodName(), person);
		Person savedPerson = repository.save(person).block();
		LOGGER.debug("{}: savedPerson={}", MethodInfo.methodName(), savedPerson);
 		Mono<Person> findResultMono = repository.findById(savedPerson.getId());
 		Person findResult = findResultMono.block();
 		LOGGER.debug("{}: findResult={}", MethodInfo.methodName(), findResult);
 		assertTrue(findResultMono.hasElement().block());
	}

	@Test
	@Order(4)
	@DisplayName("Generate a Person, persist it then retrieve it using findByOne")
	void findByOneByExampleTest() {
		Person person = new PersonBuilder().withDefaults().build();
		LOGGER.debug("{}: person={}", MethodInfo.methodName(), person);
		Person savedPerson = repository.save(person).block();
		LOGGER.debug("{}: savedPerson={}", MethodInfo.methodName(), savedPerson);
		

		Example<Person> example = Example.of((new PersonBuilder()).clone(savedPerson).otherNames(null).build());
		LOGGER.debug("{}: example-Person={}", MethodInfo.methodName(), example.getProbe());
		
 		Mono<Person> findResultMono = repository.findOne(example);
 		Person findResult = findResultMono.block();
 		LOGGER.debug("{}: findResult={}", MethodInfo.methodName(), findResult);
 		assertTrue(findResultMono.hasElement().block());
	}	
	
}
