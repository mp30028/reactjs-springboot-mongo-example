package com.zonesoft.example.persons.api.repositories;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.zonesoft.example.persons.api.entities.Person;

public interface PersonRepository extends ReactiveMongoRepository<Person, String>{

}
