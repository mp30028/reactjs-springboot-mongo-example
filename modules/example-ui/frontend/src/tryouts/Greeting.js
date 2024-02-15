import React from 'react';
import DataService from '../lib/data-service';
import ApiClientConfigs from '../lib/api-client-configs';
import SimpleGreeting from '../lib/simple-greeting';

const Greeting = () => {
	const CONFIG_KEY = "SimpleGreeting";
	const dataService = new DataService(new ApiClientConfigs(), CONFIG_KEY);
	
	return (
		<>
			<SimpleGreeting  dataService={dataService} />
		
		</>	
	)

}

export default Greeting;