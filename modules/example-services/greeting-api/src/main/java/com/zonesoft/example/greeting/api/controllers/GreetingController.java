package com.zonesoft.example.greeting.api.controllers;


import java.util.List;
import java.util.function.Supplier;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zonesoft.example.greeting.api.entities.Greeting;
//import com.zonesoft.example.greeting.api.services.GreetingService;
import com.zonesoft.example.greeting.synthetics.GreetingBuilder;
import com.zonesoft.example.utils.synthetics.SyntheticRecordsGenerator;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/greetings")
public class GreetingController {

//	private final GreetingService service;
	
//	@Autowired
//	public GreetingController(GreetingService service) {
//		this.service = service;
//	}

	@GetMapping
	public Mono<ResponseEntity<List<Greeting>>> findAll(){
		SyntheticRecordsGenerator<GreetingBuilder, Greeting> builder = new SyntheticRecordsGenerator<GreetingBuilder, Greeting>();
		Supplier<GreetingBuilder> greetingSupplier = (() -> new GreetingBuilder().withDefaults());
        return Mono.just(ResponseEntity.ok().body(builder.generate(greetingSupplier)));
	}
	
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Greeting>> findById(@PathVariable String id){
    	return Mono.just(ResponseEntity.noContent().build());
    }

    @PostMapping
    public Mono<ResponseEntity<Greeting>> insert(@RequestBody Greeting greeting){
    	return Mono.just(ResponseEntity.noContent().build());
    }
    
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Greeting>> update(@PathVariable String id, @RequestBody Greeting greeting){
    	return Mono.just(ResponseEntity.noContent().build());
    }
    
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteById(@PathVariable String id){
    	return Mono.just(ResponseEntity.accepted().<Void>build());
    }
}