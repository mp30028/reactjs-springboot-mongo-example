package com.zonesoft.example.greeting.api.configurations;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import com.zonesoft.example.utils.helpers.ConverterDateToOffsetDateTime;
import com.zonesoft.example.utils.helpers.ConverterOffsetDateTimeToDate;

@Configuration
public class MongoConfig {

    @Bean
    public MongoCustomConversions mongoCustomConversions() {
        return new MongoCustomConversions(Arrays.asList(
                new ConverterDateToOffsetDateTime(),
                new ConverterOffsetDateTimeToDate()
        ));
    }

}
