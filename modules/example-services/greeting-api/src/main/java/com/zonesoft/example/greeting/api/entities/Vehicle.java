package com.zonesoft.example.greeting.api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vehicles")
public class Vehicle {
	
	@Id private String id;
	private Integer modelYear; //Year
	private String make; //Make
	private String model; //Model
	private String category; //Category
	
	public Vehicle() {
		super();
	};
	
	public Vehicle(Integer modelYear, String make, String model, String category) {
		super();
		this.modelYear = modelYear;
		this.make = make;
		this.model = model;
		this.category = category;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public Integer getModelYear() {
		return modelYear;
	}
	
	public void setModelYear(Integer modelYear) {
		this.modelYear = modelYear;
	}
	
	public String getMake() {
		return make;
	}
	
	public void setMake(String make) {
		this.make = make;
	}
	
	public String getModel() {
		return model;
	}
	
	public void setModel(String model) {
		this.model = model;
	}
	
	public String getCategory() {
		return category;
	}
	
	public void setCategory(String category) {
		this.category = category;
	}
	
}
