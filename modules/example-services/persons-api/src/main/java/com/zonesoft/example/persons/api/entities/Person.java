package com.zonesoft.example.persons.api.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.zonesoft.example.utils.enums.Gender;
import com.zonesoft.example.utils.helpers.ToStringHelper;

@Document(collection = "persons")
public class Person {
	
	@Id private String id;
	private String moniker;
	private String firstname;
	private String lastname;
	private Gender gender;
	private List<OtherName> otherNames = new ArrayList<>();
	
	public Person(String id, String moniker, String firstname, String lastname, Gender gender) {
		super();
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.moniker = moniker;
		this.gender = gender;
	}
	
	public Person(String moniker, String firstname, String lastname, Gender gender) {
		new Person(null, moniker, firstname, lastname, gender);
	}
	

	public Person() {
		new Person(null, null, null, null, null);
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getMoniker() {
		return moniker;
	}
	
	public void setMoniker(String moniker) {
		this.moniker = moniker;
	}
	
	public void setOtherNames(List<OtherName> l){
		this.otherNames = l;
	}
	
	public List<OtherName> getOtherNames(){
		return this.otherNames;
	}
	
	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	@Override
	public String toString(){
		ToStringHelper helper = new ToStringHelper();
		return helper.begin()
			.wrLn("id", id)
			.wrLn("lastname", lastname)
			.wrLn("firstname", firstname)
			.wrLn("moniker", moniker)
			.wrLn("gender", gender)
			.wr("otherNames", otherNames)
		.end().build();
	}

}