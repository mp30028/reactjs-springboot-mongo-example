package com.zonesoft.example.api.tryouts;

public class AbstractTryout {
	
	private static boolean ARE_TESTS_ENABLED = false; 
	
	public AbstractTryout(boolean enableTests) {
		AbstractTryout.ARE_TESTS_ENABLED = enableTests;
	}
	
	protected boolean testsAreEnabled(){
	    return AbstractTryout.ARE_TESTS_ENABLED;
	}

}
