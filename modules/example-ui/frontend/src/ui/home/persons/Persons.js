import React, {useEffect, useState} from 'react';
import Logger, {level} from 'lib/logger';
import DataService from 'lib/data-service';
import ApiClientConfigs from 'lib/api-client-configs';
import ListDisplay from 'lib/list-display';
import OtherNames from 'ui/home/persons/other-names/OtherNames';
import Person from 'ui/home/persons/person/Person';
import EventService from 'lib/event-service';

const Persons = () => {
	const CONFIG_KEY = "Persons";
	const LOGGER =  Logger(CONFIG_KEY, level.DEBUG);
	const [dataService, setDataService] = useState(null);
//	const dataService = new DataService(new ApiClientConfigs(), CONFIG_KEY);

	const [persons, setPersons]= useState([]);
	
	//data-service-initialisation-hook
	useEffect(()=>{
		const ds = new DataService(new ApiClientConfigs(), CONFIG_KEY);
		setDataService(ds);
	},[setDataService])
	
	
	
	//post-initialisation-hook
	useEffect(() => {
		const LOGGER =  Logger(CONFIG_KEY);
		const eventService = new EventService(new ApiClientConfigs(), CONFIG_KEY); 		
		const onmessageHandler = (event) =>{
			var eventData = JSON.parse(event.data);
			LOGGER.debug(LOGGER.name, "post-initialisation-hook", {event: event}, {eventData: eventData.body})
//			var updatedData = DataHandler.doUpdate(conversationsRef.current, eventData);
//			setPersons(updatedData);
		};		
		
		if (dataService){
			dataService.fetchAll().then((data) => setPersons(data));
		}else{
			setPersons([]);
		}
		if (eventService){
			eventService.listen(onmessageHandler);
		}
	}, [setPersons,dataService]);		
	
	
	
	const dataSaveHandler = (updatedData) => {
		LOGGER.debug(LOGGER.name, "dataSaveHandler", {updatedData: updatedData});
		dataService.update(updatedData).then( (data) => LOGGER.debug(LOGGER.name, "dataSaveHandler", {dataAfterUpdate: data}));
	}
	
	
	const itemHeader = ({dataItem}) => {
		const LOGGER =  Logger("itemHeader", level.info);
		LOGGER.debug(LOGGER.name, {dataItem: dataItem});	
			return (
				<>
				 	<Person data={dataItem} dataSaveHandler={dataSaveHandler}/>
				</>
			)					
	}
	
	const itemBody = ({dataItem}) => {
		const LOGGER =  Logger("itemBody", level.info);
		LOGGER.debug(LOGGER.name, {dataItem: dataItem});
		return(
			<>
				<OtherNames data={dataItem.otherNames} />
			</>
		);				
	}
		
	return (
		<>
			<ListDisplay  data={persons} itemHeader={itemHeader} itemBody={itemBody}/>
		</>	
	)

}

export default Persons;