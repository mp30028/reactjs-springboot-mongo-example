package com.zonesoft.example.greeting.api.repositories;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.zonesoft.example.greeting.api.entities.Vehicle;

public interface VehicleRepository extends ReactiveMongoRepository<Vehicle, String> {

}
