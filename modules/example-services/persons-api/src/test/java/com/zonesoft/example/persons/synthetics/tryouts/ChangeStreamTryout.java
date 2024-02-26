package com.zonesoft.example.persons.synthetics.tryouts;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
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
import org.springframework.data.mongodb.core.ChangeStreamEvent;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.EnabledIf;

import com.mongodb.client.model.changestream.OperationType;
import com.zonesoft.example.persons.PersonsApiApp;
import com.zonesoft.example.persons.api.entities.Person;
import com.zonesoft.example.persons.api.repositories.PersonRepository;
import com.zonesoft.example.persons.api.services.PersonService;
import com.zonesoft.example.persons.synthetics.builders.PersonBuilder;
import com.zonesoft.example.utils.helpers.MethodInfo;

import jakarta.annotation.PostConstruct;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import reactor.test.StepVerifier.FirstStep;

@SpringBootTest
@ContextConfiguration(classes = {PersonsApiApp.class})
@TestMethodOrder(OrderAnnotation.class)
@EnabledIf(expression = "${ENABLE_TRYOUTS}", loadContext = true)
public class ChangeStreamTryout {
	
	
	private static final Logger LOGGER =  LoggerFactory.getLogger(ChangeStreamTryout.class);
	private static final String WARNING = "\n\n\n ***** WARNING: ChangeStreamTryout has been enabled. It is not normally supposed to be enabled******\n\n\n";
	
	
//	private List<ChangeStreamEvent<Person>> events = new ArrayList<>();
	private  PersonRepository repository;
	private  ReactiveMongoTemplate template;  
	private  PersonService service;
	private  Flux<ChangeStreamEvent<Person>> streamFlux;
	
	@Autowired
	public ChangeStreamTryout(PersonRepository repository, ReactiveMongoTemplate template) {
		this.repository = repository;
		this.template = template;
		this.service = new PersonService( this.repository,  this.template);
		
		this.streamFlux = this.service.events();
		
	}
	
//	@BeforeEach
//	void setupBeforeAll() {
//	
//	}
//	
//	@AfterEach
//	void tearDownAfterAll() {
//
//		this.streamFlux = null;
//		this.service = null;
//	}

	@Test
	@Order(1)
	@DisplayName("Show warning")
	void showWarning(){
		LOGGER.warn(WARNING);
	}
	

	@Test
	@Order(2)
	@DisplayName("Generate a Person instance and persist it to database and see if the change stream is triggered")
	void generatePersonsDataAndCheckIfChangeStreamTriggered() throws InterruptedException {
//		streamFlux.subscribe((event) ->{
//			LOGGER.debug("{}: event={}",MethodInfo.methodName(),event);
//		});	
		
//		Flux<String> sflux = streamFlux.map((event) ->{
//			LOGGER.debug("{}: op={}, person={}", MethodInfo.methodName(), event.getOperationType(), event.getBody());
//			return event.getRaw().toString();
//		});
//		StepVerifier
//			.create(streamFlux)
//			.consumeNextWith((event) ->{
//				LOGGER.debug("{}: op={}, person={}", MethodInfo.methodName(), event.getOperationType(), event.getBody());
//			})
//			.verifyTimeout(Duration.of(10,ChronoUnit.SECONDS));
		streamFlux.onErrorComplete().blockFirst(Duration.of(5, ChronoUnit.SECONDS));
//			(event) ->{
//				LOGGER.debug("{}: op={}, person={}", MethodInfo.methodName(), event.getOperationType(), event.getBody());
//			}
//		);
		Person person = new PersonBuilder().withDefaults().build();
		Mono<Person> personMono = service.save(person);
		personMono.onErrorComplete().block();
//		StepVerifier
//		.create(personMono)
//		.expectNext(person)
//		.expectComplete()
//		.verify();
	}	
}
