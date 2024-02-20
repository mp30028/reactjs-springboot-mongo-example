package com.zonesoft.example.persons.synthetics.data_generator;

import static org.junit.jupiter.api.Assertions.*;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.condition.EnabledIf;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.zonesoft.example.persons.PersonsApiApp;
import com.zonesoft.example.persons.api.entities.Person;
import com.zonesoft.example.persons.api.repositories.PersonRepository;
import com.zonesoft.example.persons.synthetics.builders.PersonBuilder;
import com.zonesoft.example.utils.synthetics.Generator;

import reactor.core.publisher.Mono;


@SpringBootTest
@ContextConfiguration(classes = {PersonsApiApp.class})
@TestMethodOrder(OrderAnnotation.class)
class PersonsDataGenerator {
	
	private static final Logger LOGGER =  LoggerFactory.getLogger(PersonsDataGenerator.class);
	private static final int DEFAULT_MIN_RECORDS = 10;
	private static final int DEFAULT_MAX_RECORDS = 30;
	
	@Autowired
	private PersonRepository repository;
	private boolean isDataToBeGenerated = false; 
	
	@EnabledIf("isDataToBeGenerated")
	@Test
	@Order(1)
	@DisplayName("Check repository gets autowired using application.properties")
	void testRepositoryHasBeenAutowired() {
		assertNotNull(repository);
	}

	
	@EnabledIf("isDataToBeGenerated")
	@Test
	@Order(2)
	@DisplayName("Generate Persons Data and persist it to database")
	void generatePersonsData() {
		int recordsToGenerate = Generator.generateRandomInt(DEFAULT_MIN_RECORDS, DEFAULT_MAX_RECORDS);
		List<Person> personsToAdd = new ArrayList<>();
		for (int j=0; j < recordsToGenerate; j++) {
			Person person = new PersonBuilder().withDefaults().build();
			personsToAdd.add(person);
		}
		repository.saveAll(personsToAdd).subscribe();
	}
	
	@EnabledIf("isDataToBeGenerated")
	@Test
	@Order(99)
	@DisplayName("Check Data-Generation is switched off")
	void checkIsDataToBeGeneratedIsFalse() throws InterruptedException {
		LOGGER.warn("\n\n\n ***** WARNING: Data Generation has been enabled. This is not normally supposed to be enabled******\n\n\n");
		Function<String, String> f = ((v) -> {
			try {
				Thread.sleep(Duration.of(10, ChronoUnit.SECONDS));
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return v;
		});
		Mono<String> mono = Mono.just("done").map(f);
		mono.block();
		assertFalse(isDataToBeGenerated,"***** WARNING: Data Generation has been enabled. This is not normally supposed to be enabled******");
	}
	
	protected boolean isDataToBeGenerated(){
	    return this.isDataToBeGenerated;
	}
}
