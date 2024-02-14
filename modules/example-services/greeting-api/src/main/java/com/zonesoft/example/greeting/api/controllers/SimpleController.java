package com.zonesoft.example.greeting.api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.zonesoft.example.greeting.api.entities.Greeting;
import com.zonesoft.example.greeting.synthetics.GreetingBuilder;

import reactor.core.publisher.Mono;

@RestController

public class SimpleController {

	@GetMapping(value={"","/","/greeting"})
	@ResponseBody
	public Mono<ResponseEntity<Greeting>> greeting() {
		Greeting greeting = new GreetingBuilder().message("Hello from greeting api").withDefaults().build();
		return Mono.just(ResponseEntity.ok(greeting));
	}
	
	

}