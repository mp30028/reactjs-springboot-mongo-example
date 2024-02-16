import React from 'react';
import DataService from 'lib/data-service';
import ApiClientConfigs from 'lib/api-client-configs';
import RawDisplay from 'lib/raw-display';

const SimpleGreeting = () => {
	const CONFIG_KEY = "SimpleGreeting";
	const dataService = new DataService(new ApiClientConfigs(), CONFIG_KEY);
	
	return (
		<>
			<RawDisplay  dataService={dataService} />
		
		</>	
	)

}

export default SimpleGreeting;