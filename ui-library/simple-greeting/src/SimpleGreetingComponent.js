import React, {useState, useEffect} from 'react';
//import DataService from '../../../classes/data-services/DataService.class';
//import ApiClientConfigs from '../../../classes/configurations/ApiClientConfigs.class';

const SimpleGreetingComponent = (props) => {
//	const CONFIG_KEY = "SimpleGreeting";
	const emptyGreeting = {id:"temp-id-000", username: "--UNKNOWN--", message :"", timeOfGreeting :""};
	const [greeting, setGreeting] = useState(emptyGreeting);
	
	useEffect(() => {
		//const dataService = new DataService(new ApiClientConfigs(), CONFIG_KEY);
		props.dataService.fetchAll().then((data) => setGreeting(data));		
	}, [setGreeting,props.dataService]);	
	
	return (
		<pre>
			{JSON.stringify(greeting,null,4)}
		</pre>
	)
}

export default SimpleGreetingComponent;