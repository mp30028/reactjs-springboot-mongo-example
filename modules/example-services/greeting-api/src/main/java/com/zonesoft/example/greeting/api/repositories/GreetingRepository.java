package com.zonesoft.example.greeting.api.repositories;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.zonesoft.example.greeting.api.entities.Greeting;

public interface GreetingRepository extends ReactiveMongoRepository<Greeting, String> {

}
