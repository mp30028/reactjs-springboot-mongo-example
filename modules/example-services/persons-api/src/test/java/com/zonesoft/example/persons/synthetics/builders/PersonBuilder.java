package com.zonesoft.example.persons.synthetics.builders;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zonesoft.example.persons.api.entities.OtherName;
import com.zonesoft.example.persons.api.entities.Person;
import com.zonesoft.example.utils.enums.Gender;
import com.zonesoft.example.utils.synthetics.Generator;
import com.zonesoft.example.utils.synthetics.ISyntheticRecordBuilder;

public class PersonBuilder extends Person implements ISyntheticRecordBuilder<Person, PersonBuilder> {
	private static final long serialVersionUID = -158456690212315017L;
	private static final int DEFAULT_MIN_NUMBER_OF_OTHER_NAMES = 1;
	private static final int DEFAULT_MAX_NUMBER_OF_OTHER_NAMES = 5;
	
	public PersonBuilder id() {
		this.setId(Generator.generateUUID());
		return this;
	}

	public PersonBuilder id(String s) {
		this.setId(s);
		return this;
	}
	
	private PersonBuilder checkGender() {
		if(Objects.isNull(this.getGender())) {
			return this.gender();
		}else {
			return this;
		}
	}
	
	public PersonBuilder gender() {
		this.setGender(Generator.generateGender());
		return this;
	}	
	
	public PersonBuilder gender(Gender g) {
		this.setGender(g);
		return this;
	}
	
	public PersonBuilder firstname() {
		this.checkGender().setFirstname(Generator.generateFirstName(this.getGender()));
		return this;
	}
	
	public PersonBuilder firstname(String s) {
		this.setFirstname(s);
		return this;
	}
	
	public PersonBuilder lastname() {
		this.setLastname(Generator.generateLastName());
		return this;
	}
	
	public PersonBuilder lastname(String s) {
		this.setLastname(s);
		return this;
	}
	
	public PersonBuilder moniker() {
		this.setMoniker(Generator.generateNickname());
		return this;
	}
	
	public PersonBuilder moniker(String s) {
		this.setMoniker(s);
		return this;
	}
	
	public PersonBuilder otherNames() {
		if(Objects.isNull(this.getOtherNames())) {
			List<OtherName> list = new ArrayList<>();
			this.setOtherNames(list);
		}
		int n = Generator.generateRandomInt(DEFAULT_MIN_NUMBER_OF_OTHER_NAMES, DEFAULT_MAX_NUMBER_OF_OTHER_NAMES);
		for(int j=0; j < n ; j++) {
			OtherNameBuilder builder = new OtherNameBuilder();
			OtherName otherName = builder.withDefaults().build();
			this.getOtherNames().add(otherName);
		}
		return this;
	}	
	
	public PersonBuilder otherNames(List<OtherName> l) {
		this.setOtherNames(l);
		return this;
	}

	@Override
	public PersonBuilder withDefaults(boolean withId) {
		if (withId) {
			if (Objects.isNull(this.getId())) this.id();
		}
		if(Objects.isNull(this.getGender())) this.gender();
		if(Objects.isNull(this.getFirstname()) || this.getFirstname().isBlank() ) this.firstname();
		if(Objects.isNull(this.getLastname()) || this.getLastname().isBlank()) this.lastname();
		if(Objects.isNull(this.getMoniker()) || this.getMoniker().isBlank()) this.moniker();		
		if(Objects.isNull(this.getOtherNames()) || this.getOtherNames().isEmpty()) this.otherNames();
		return this;		
	}

	@Override
	public PersonBuilder withDefaults() {
		return this.withDefaults(true);
	}

	@Override
	public Person build() {
		return this;
	}

	@Override
	public PersonBuilder clone(Person source) {
		Person newPerson = null;
        try {
        	ObjectMapper mapper = new ObjectMapper();
        	newPerson = mapper.readValue(mapper.writeValueAsString(source), Person.class);
    		return this
    			.gender(newPerson.getGender())
    			.firstname(newPerson.getFirstname())
    			.lastname(newPerson.getLastname())
    			.moniker(newPerson.getMoniker())    		
    			.otherNames(newPerson.getOtherNames());        	
        } catch (JsonMappingException e) {
			e.printStackTrace();
			return this;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return this;
		}
	}
}
