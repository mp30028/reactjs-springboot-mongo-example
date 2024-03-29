package com.zonesoft.example.persons.api.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ChangeStreamEvent;
import org.springframework.data.mongodb.core.ChangeStreamOptions;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.stereotype.Service;

import com.zonesoft.example.persons.api.entities.Person;
import com.zonesoft.example.persons.api.repositories.PersonRepository;
import com.zonesoft.example.utils.helpers.MethodInfo;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PersonService {

	private static final Logger LOGGER = LoggerFactory.getLogger(PersonService.class);
	
	private final PersonRepository repository;
	private final ReactiveMongoTemplate template;
	
	@Autowired
	public PersonService(PersonRepository repository, ReactiveMongoTemplate template) {
		this.repository = repository;
		this.template = template;
	}
	
	public Mono<Person> insert(Person person) {
		LOGGER.debug("{}: person={}", MethodInfo.methodName(), person);
		return repository.insert(person);
	}
	
	public Mono<Person> update(Person person){
		return repository.save(person);
	}
	
	public Mono<Person> save(Person person){
		 return repository.save(person);
   }
	
	public Flux<Person> saveAll(List<Person> persons){
		 return repository.saveAll(persons);
    }
    
	public Mono<Person> findById(String id){
    	return repository.findById(id);
    }
    
	public Flux<Person> findByListOfIds(List<String> listOfId){
    	return repository.findByIdIn(listOfId);
    }
		
	public Flux<Person> findAll(){
		return repository.findAll();
	}
	
	public Mono<Void> deleteAll(){		
		return repository.deleteAll();
    }
    
	public Mono<Void> deleteById(String id){
		return repository.deleteById(id);
    }
	
	public Flux<Person> findByMoniker(String moniker){
    	return repository.findByMoniker(moniker);
    }
	
	public Flux<ChangeStreamEvent<Person>> events() {
//        ChangeStreamOptions options = ChangeStreamOptions.builder()
//        		.fullDocumentBeforeChangeLookup('persons').build();
		Flux<ChangeStreamEvent<Person>> flux = template
				.changeStream(Person.class)
//				.withOptions(null)
				.watchCollection("persons")
				.listen().log();
		return flux;
	}
	
}
