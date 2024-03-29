package com.zonesoft.example.utils.helpers;

import org.springframework.core.convert.converter.Converter;

import java.time.OffsetDateTime;
import java.util.Date;

public class ConverterOffsetDateTimeToDate implements Converter<OffsetDateTime, Date> {
	
    @Override
    public Date convert(OffsetDateTime odt) {
        return Date.from(odt.toInstant());
    }
    
}
