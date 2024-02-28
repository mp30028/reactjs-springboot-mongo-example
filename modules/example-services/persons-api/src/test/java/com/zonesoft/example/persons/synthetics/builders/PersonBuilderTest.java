package com.zonesoft.example.persons.synthetics.builders;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zonesoft.example.persons.api.entities.Person;

import com.zonesoft.example.utils.helpers.MethodInfo;


class PersonBuilderTest {
	private static final Logger LOGGER = LoggerFactory.getLogger(PersonBuilderTest.class);

	@Test
	void simpleTest() {
		PersonBuilder builder = new PersonBuilder();
		Person person = builder.withDefaults().build();
		LOGGER.debug("{}: person={}", MethodInfo.methodName() ,person);
		assertNotNull(person);
		assertNotNull(person.getFirstname());
		assertNotNull(person.getLastname());
		assertNotNull(person.getGender());
		assertNotNull(person.getId());
		assertNotNull(person.getMoniker());
		assertNotNull(person.getOtherNames());
		assertTrue(person.getOtherNames().size() > 0);
	}

}
