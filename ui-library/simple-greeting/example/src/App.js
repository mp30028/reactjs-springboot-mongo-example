import React from 'react'
import DataService from './classes/data-services/DataService.class';
import ApiClientConfigs from './classes/configurations/ApiClientConfigs.class';
import SimpleGreeting from 'simple-greeting';


const App = () => {
	const CONFIG_KEY = "SimpleGreeting"
	const dataService = new DataService(new ApiClientConfigs(), CONFIG_KEY);
	
  return <SimpleGreeting  dataService={dataService} />
}

export default App
