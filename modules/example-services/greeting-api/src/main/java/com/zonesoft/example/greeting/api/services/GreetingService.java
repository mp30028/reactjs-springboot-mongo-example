package com.zonesoft.example.greeting.api.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zonesoft.example.greeting.api.entities.Greeting;
import com.zonesoft.example.greeting.api.repositories.GreetingRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class GreetingService {
	private static final Logger LOGGER = LoggerFactory.getLogger(GreetingService.class);

	private final GreetingRepository repository;
	
	@Autowired
	public GreetingService(GreetingRepository repository) {
		this.repository = repository;
	}
	
	public Mono<Greeting> insert(Greeting greeting) {
		LOGGER.debug("FROM GreetingService.insert: inserted greeting={}",greeting);
		return repository.insert(greeting);
	}
	
	public Flux<Greeting> findAll(){
		return repository.findAll();
	}
	
	
}
