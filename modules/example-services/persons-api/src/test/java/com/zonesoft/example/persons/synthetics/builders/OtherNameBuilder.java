package com.zonesoft.example.persons.synthetics.builders;

import java.util.Objects;

import com.zonesoft.example.persons.api.entities.OtherName;
import com.zonesoft.example.utils.synthetics.Generator;
import com.zonesoft.example.utils.synthetics.ISyntheticRecordBuilder;

public class OtherNameBuilder extends OtherName implements ISyntheticRecordBuilder<OtherName, OtherNameBuilder> {

	public OtherNameBuilder id() {
		this.setId(Generator.generateUUID());
		return this;
	}

	public OtherNameBuilder id(String s) {
		this.setId(s);
		return this;
	}
	
	private OtherNameType generateNameType() {
		OtherNameType[] values =  OtherNameType.values();
		return values[Generator.generateRandomInt(0, values.length-1)];
	}
	
	public OtherNameBuilder nameType() {
		this.setNameType(generateNameType());
		return this;
	}

	public OtherNameBuilder nameType(OtherNameType ont) {
		this.setNameType(ont);
		return this;
	}
	
	public OtherNameBuilder value() {
		switch (this.getNameType()) {
			case NICK_NAME:
				this.setValue(Generator.generateNickname());
				break;
			case ALIAS:	
				this.setValue(Generator.generateNickname());
				break;				
			default:
				if (Objects.isNull(this.getNameType())) {
					this.setNameType(OtherNameType.MIDDLE_NAME);
				}				
				this.setValue(Generator.generateMiddleName(Generator.generateGender()));
				break;
		}
		return this;
	}

	public OtherNameBuilder value(String s) {
		if (Objects.isNull(this.getNameType())) {
			this.setNameType(OtherNameType.MIDDLE_NAME);
		}
		this.setValue(s);
		return this;
	}
	
	@Override
	public OtherNameBuilder withDefaults() {
		return this.withDefaults(true);
	}

	@Override
	public OtherNameBuilder withDefaults(boolean withId) {
		if (withId) {
			if (Objects.isNull(this.getId())) this.id();
		};
		if(Objects.isNull(this.getNameType())) this.nameType();
		if(Objects.isNull(this.getValue()) || this.getValue().isBlank())  this.value();
		return this;
	}

	@Override
	public OtherName build() {
		return this;
	}
	
}
