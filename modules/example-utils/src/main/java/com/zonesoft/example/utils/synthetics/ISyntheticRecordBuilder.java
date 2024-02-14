package com.zonesoft.example.utils.synthetics;

public interface ISyntheticRecordBuilder <T, B> {
	public T build();
	public B withDefaults();
	public B withDefaults(boolean withId);
}
