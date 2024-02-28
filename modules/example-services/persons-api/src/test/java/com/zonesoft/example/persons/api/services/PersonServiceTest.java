package com.zonesoft.example.persons.api.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;

import com.zonesoft.example.persons.api.entities.Person;
import com.zonesoft.example.persons.api.repositories.PersonRepository;
import com.zonesoft.example.persons.synthetics.builders.PersonBuilder;
import com.zonesoft.example.utils.helpers.MethodInfo;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

@TestMethodOrder(OrderAnnotation.class)
class PersonServiceTest {

	private static final Logger LOGGER = LoggerFactory.getLogger(PersonServiceTest.class);
	
	private PersonRepository mockRepository = Mockito.mock(PersonRepository.class);
	private ReactiveMongoTemplate mockTemplate = Mockito.mock(ReactiveMongoTemplate.class);
	private PersonService service = new PersonService(mockRepository, mockTemplate);
	
	
	@Test
	@Order(1)
	@DisplayName("Test service gets wired up")
	void testSetupIsOk() {
		assertNotNull(service);
	}
	
	@Test
	@Order(2)
	@DisplayName("Test findById with valid id and a record is found")
	void testFindByIdWithValidExistingId() {
		String id = "b014ca54-4abe-4c11-ae8c-bee30e452733";
		Person returnValue = new PersonBuilder().withDefaults(false).id(id).build();
		Mockito.when(mockRepository.findById(id)).thenReturn(Mono.just(returnValue));
		StepVerifier
			.create(service.findById(id))
			.assertNext(p -> {
				LOGGER.debug("{}: find-result={}", MethodInfo.methodName(), p);
				assertEquals(returnValue, p);
			})
			.verifyComplete();
	}

	@Test
	@Order(3)
	@DisplayName("Test findById with an invalid id and so no result is found")
	void testFindByIdWithInvalidId() {
		String id = "b014ca54-4abe-4c11-ae8c-bee30e452733";
		Mockito.when(mockRepository.findById(id)).thenReturn(Mono.empty());
		StepVerifier
			.create(service.findById(id))
			.expectComplete();
	}
	
}
