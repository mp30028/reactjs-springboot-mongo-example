import React from 'react';
import DataService from '../../lib/data-service';
import ApiClientConfigs from '../../lib/api-client-configs';
import GreetingsComponent from '../../lib/greetings';

const Greetings = () => {
	const CONFIG_KEY = "Greetings";
	const dataService = new DataService(new ApiClientConfigs(), CONFIG_KEY);
	
	return (
		<>
			<GreetingsComponent  dataService={dataService} />
		
		</>	
	)

}

export default Greetings;