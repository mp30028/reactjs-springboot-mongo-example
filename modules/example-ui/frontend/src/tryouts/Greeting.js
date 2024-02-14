import React, {useState, useEffect} from 'react';
//import {SimpleGreeting} from 'simple-greeting';
//import DataService from '../classes/data-services/DataService.class';
//import ApiClientConfigs from '../classes/configurations/ApiClientConfigs.class';

const Greeting = () => {
	const emptyDataObject = {id:"temp-id-000", username: "--UNKNOWN--", message :"", timeOfGreeting :""};
	const [dataObject, setDataObject] = useState(emptyDataObject);
	
	useEffect(() => {
		const fetchGreeting = async() => {
				const response = await fetch(
					"http://localhost:8080/greeting", 
					{	method: 'GET',
						headers: {
							'Content-Type': 'application/json;charset=UTF-8',
							'Accept': 'application/json, text/plain'
						}
					}
				);
				return await response.json();
		};	
	  fetchGreeting().then((greetingData) => setDataObject(greetingData))
	 },[setDataObject]);
	

	return (
		<>
			{dataObject.message}
		
		</>
	)


}

export default Greeting;