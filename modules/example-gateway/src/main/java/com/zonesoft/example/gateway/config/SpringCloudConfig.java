package com.zonesoft.example.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringCloudConfig {

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("greeting-api", r -> r.path("/api/greetings/**").uri("http://localhost:7771"))
                .route("simple-greeting", r -> r.path("/greeting").uri("http://localhost:7771"))
                .route("environment-variables", r -> r.path("/environment-variables").uri("http://localhost:3000/"))
                .route("ui-app", r -> r.path("/ui/main-app/**").uri("http://localhost:3000/"))
                .route("default-route", r -> r.path("/**").uri("http://localhost:3000"))

                .build();
    }

}