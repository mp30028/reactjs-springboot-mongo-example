import React from 'react';
import DataService from 'lib/data-service';
import ApiClientConfigs from 'lib/api-client-configs';
import ListDisplay from 'lib/list-display';

const Persons = () => {
	const CONFIG_KEY = "Persons";
	const dataService = new DataService(new ApiClientConfigs(), CONFIG_KEY);
	
	return (
		<>
			<ListDisplay  dataService={dataService} />
		</>	
	)

}

export default Persons;