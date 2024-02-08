package com.zonesoft.example.greeting.api.entities;

import java.time.OffsetDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import com.zonesoft.example.utils.helpers.ToStringHelper;

//import com.zonesoft.example.utils.helpers.ToStringHelper;

@Document(collection = "greetings")
public class Greeting {
	
	private static final String DEFAULT_USERNAME = "--UNKNOWN--";
	
	@Id private String id;
	private String username;
	private String message;
	private OffsetDateTime timeOfGreeting;
	
	public Greeting() {
		super();
		this.username = DEFAULT_USERNAME;
		this.timeOfGreeting = OffsetDateTime.now();
	}
	
	public Greeting(String message) {
		super();
		this.username = DEFAULT_USERNAME;
		this.setMessage(message);
		this.timeOfGreeting = OffsetDateTime.now();
	}
	
	public Greeting(String message, String username) {
		super();
		this.username = username;
		this.setMessage(message);
		this.timeOfGreeting = OffsetDateTime.now();
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}	
	
	public OffsetDateTime getTimeOfGreeting() {
		return timeOfGreeting;
	}

	public void setTimeOfGreeting(OffsetDateTime timeOfGreeting) {
		this.timeOfGreeting = timeOfGreeting;
	} 
	
//	@Override
//	public String toString(){
//		ToStringHelper helper = new ToStringHelper();
//		return helper.begin()
//			.wrLn("id", id)
//			.wrLn("username", username)
//			.wrLn("message", message)
//			.wr("timeOfGreeting", timeOfGreeting)
//		.end().build();
//	}

}
