package com.zonesoft.example.greeting.api.controllers;


import java.time.OffsetDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.zonesoft.example.greeting.api.entities.Greeting;

import reactor.core.publisher.Mono;

@RestController

public class SimpleController {

	@GetMapping(value={"","/","/greeting"})
	@ResponseBody
	public Mono<ResponseEntity<Greeting>> greeting() {
		Greeting greeting = new Greeting("Greeting from hirefour-api");
		greeting.setId("temp-id-" + OffsetDateTime.now().toEpochSecond());
		return Mono.just(ResponseEntity.ok(greeting));
	}
	
	

}