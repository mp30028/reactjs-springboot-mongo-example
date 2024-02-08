package com.zonesoft.example.api.tryouts.connect_db;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.condition.EnabledIf;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.zonesoft.example.api.tryouts.AbstractTryout;
import com.zonesoft.example.greeting.GreetingApiApp;
import com.zonesoft.example.greeting.api.entities.Vehicle;
import com.zonesoft.example.greeting.api.repositories.VehicleRepository;

@SpringBootTest
@ContextConfiguration(classes = {GreetingApiApp.class})
@TestMethodOrder(OrderAnnotation.class)
class DbConnectivityTryout extends AbstractTryout{
	
	private static final boolean ENABLE_TESTS = false; 
	
	private static final Logger LOGGER = LoggerFactory.getLogger(DbConnectivityTryout.class);
	
	@Autowired
	VehicleRepository repository;
	
	
	private DbConnectivityTryout() {
		super(DbConnectivityTryout.ENABLE_TESTS);
	}
	
	@EnabledIf("testsAreEnabled")
	@Test
	@Order(1)
	@DisplayName("Check repository gets autowired using application.properties")		
	void checkRepositoryGetsAutowired() {
		assertNotNull(repository);
	}
	
	@EnabledIf("testsAreEnabled")
	@Test
	@Order(2)
	@DisplayName("Check connection is made to db")	
	void connectToDbAndFetchSomeData() {
		LOGGER.debug("FROM connectToDbAndFetchSomeData: STARTED-FETCH-ALL-AND-BLOCK-TEST");
		List<Vehicle> result = repository.findAll().collectList().block();
		for (Vehicle v : result) {
			LOGGER.debug("FROM connectToDbAndFetchSomeData: id={}, model={}",v.getId(), v.getModel());
		}
		LOGGER.debug("FROM connectToDbAndFetchSomeData: ENDED-FETCH-ALL-AND-BLOCK-TEST");
	}

}
