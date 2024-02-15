import React from 'react';
import DataService from '../../lib/data-service';
import ApiClientConfigs from '../../lib/api-client-configs';
import SimpleGreetingComponent from '../../lib/simple-greeting';

const SimpleGreeting = () => {
	const CONFIG_KEY = "SimpleGreeting";
	const dataService = new DataService(new ApiClientConfigs(), CONFIG_KEY);
	
	return (
		<>
			<SimpleGreetingComponent  dataService={dataService} />
		
		</>	
	)

}

export default SimpleGreeting;