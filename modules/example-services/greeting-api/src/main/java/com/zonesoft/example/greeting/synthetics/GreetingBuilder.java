package com.zonesoft.example.greeting.synthetics;


import java.time.OffsetDateTime;
import java.util.Objects;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zonesoft.example.greeting.api.entities.Greeting;
import com.zonesoft.example.utils.synthetics.Generator;
import com.zonesoft.example.utils.synthetics.ISyntheticRecordBuilder;

public class GreetingBuilder extends Greeting implements ISyntheticRecordBuilder<Greeting, GreetingBuilder>  {

	private static final long serialVersionUID = -8729513672785472004L;

	public GreetingBuilder id() {
		this.setId(Generator.generateUUID());
		return this;
	}

	public GreetingBuilder id(String s) {
		this.setId(s);
		return this;
	}
	
	public GreetingBuilder username() {
		this.setUsername(Generator.generateNickname());
		return this;
	}
	
	public GreetingBuilder username(String s) {
		this.setUsername(s);
		return this;
	}
	
	public GreetingBuilder timeOfGreeting() {
		this.setTimeOfGreeting(Generator.generateDateTime());
		return this;
	}
	
	public GreetingBuilder timeOfGreeting(OffsetDateTime odt) {
		this.setTimeOfGreeting(odt);
		return this;
	}
	
	public GreetingBuilder message() {
		this.setMessage(Generator.generatePhrase());
		return this;
	}
	
	public GreetingBuilder message(String s) {
		this.setMessage(s);
		return this;
	}
	
	@Override
	public GreetingBuilder withDefaults(boolean withId) {
		if (withId) {
			if (Objects.isNull(this.getId())) this.id();
		}else {
			this.setId(null);
		}
		if(Objects.isNull(this.getMessage()) || this.getMessage().isBlank() ) this.message();
		if(Objects.isNull(this.getUsername()) || this.getUsername().isBlank() || this.getUsername().equals(DEFAULT_USERNAME) ) this.username();
		if(Objects.isNull(this.getTimeOfGreeting())) this.timeOfGreeting();
		return this;
	}
	
	@Override
	public GreetingBuilder withDefaults() {
		return this.withDefaults(true);
	}
	
	@Override
	public Greeting build() {
		return this;
	}

	@Override
	public GreetingBuilder clone(Greeting source) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			Greeting deepClone = mapper.readValue(mapper.writeValueAsString(source), Greeting.class);
			return this
					.id(deepClone.getId())
					.message(deepClone.getMessage())
					.timeOfGreeting(deepClone.getTimeOfGreeting())
					.username(deepClone.getUsername());
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return this;
		}
	}

}
