package com.zonesoft.example.utils.synthetics;

import java.io.Serializable;

public interface ISyntheticRecordBuilder  <T, B> extends Serializable, Cloneable {
	public T build();
	public B withDefaults();
	public B withDefaults(boolean withId);
	public B clone(T source);
}
