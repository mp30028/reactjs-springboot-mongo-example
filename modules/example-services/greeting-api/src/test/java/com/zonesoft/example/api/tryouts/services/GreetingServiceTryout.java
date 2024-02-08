package com.zonesoft.example.api.tryouts.services;

import static org.junit.jupiter.api.Assertions.*;

import java.time.OffsetDateTime;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.condition.EnabledIf;
import org.junit.jupiter.api.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.zonesoft.example.api.tryouts.AbstractTryout;
import com.zonesoft.example.greeting.GreetingApiApp;
import com.zonesoft.example.greeting.api.entities.Greeting;
import com.zonesoft.example.greeting.api.services.GreetingService;

@SpringBootTest
@ContextConfiguration(classes = {GreetingApiApp.class})
@TestMethodOrder(OrderAnnotation.class)
class GreetingServiceTryout extends AbstractTryout {
	
	private static final boolean ENABLE_TESTS = false;
	private static final Logger LOGGER = LoggerFactory.getLogger(GreetingServiceTryout.class);
	
	@Autowired private GreetingService service;
	
	private GreetingServiceTryout() {
		super(GreetingServiceTryout.ENABLE_TESTS);
		LOGGER.info("FROM GreetingServiceTryout<constructor>: ENABLE_TESTS={}", ENABLE_TESTS);
	}
	
	@EnabledIf("testsAreEnabled")
	@Test
	@Order(1)
	@DisplayName("Check GreetingService gets autowired")
	void checkAutowiring() {
		assertNotNull(service);
	}
	
	@EnabledIf("testsAreEnabled")
	@Test
	@Order(2)
	@DisplayName("Insert a greeting and check it was persisted in the db")
	void insertGreeting() {
		int EXPECTED_ID_LENGTH = 24;
		OffsetDateTime now = OffsetDateTime.now();
		String message = "Hello from GreetingServiceTryout.insertGreeting at " + now.toString();
		Greeting greeting = new Greeting();
		greeting.setMessage(message);
		Greeting updatedGreeting = service.insert(greeting).block();
		LOGGER.debug("FROM GreetingService.insertGreeting: greeting(out)={}",updatedGreeting);
		assertNotNull(updatedGreeting.getId());
		assertEquals(EXPECTED_ID_LENGTH, updatedGreeting.getId().length());
	}
	
	@EnabledIf("testsAreEnabled")
	@Test
	@Order(3)
	@DisplayName("Retrieve all and check there is at lease one or more")
	void fetchAllGreetings() {
		List<Greeting> fetchedGreetings = service.findAll().collectList().block();
		for(Greeting greeting: fetchedGreetings) {
			LOGGER.debug("FROM GreetingService.fetchAllGreetings: greeting={}",greeting);
		}
		assertTrue(fetchedGreetings.size() >= 1);
	}

}
