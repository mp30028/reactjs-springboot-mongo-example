import React, {useEffect, useState, useRef} from 'react';
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
	const personsRef = useRef([]);
	const [persons, setPersons]= useState([]);
	
	useEffect(()=>{
		const ds = new DataService(new ApiClientConfigs(), CONFIG_KEY);
		setDataService(ds);
	},[setDataService])
	
	useEffect(() => {
		const LOGGER =  Logger(CONFIG_KEY);
		const eventService = new EventService(new ApiClientConfigs(), CONFIG_KEY);
		 		
		const onmessageHandler = (event) =>{
			
			const updatePersons = (currentPersons, updatedRecord) => {
				const updatedPersons = currentPersons.map((p) => {
					if (p.id === updatedRecord.id){
						return updatedRecord;
					}else{
						return p;
					}
				});
				setPersons(updatedPersons);
			}
			
			const deleteFromPersons = (currentPersons, deletedRecordId) => {
				const filteredPersons = currentPersons.filter((item) => item.id !== deletedRecordId );
				setPersons(filteredPersons);				
			}
			
			const insertIntoPersons = (currentPersons, newRecord) => {
				const updatedPersons = [...currentPersons , newRecord];
				setPersons(updatedPersons);				
			}
			
			const eventData = JSON.parse(event.data);
			const eventDataBody = eventData.body;
			const operationType = eventData.operationType;
			LOGGER.debug(LOGGER.name, "onmessageHandler",{event: event}, {operationType: operationType}, {eventDataBody: eventDataBody});
			
			switch(operationType){
				case 'REPLACE':
					LOGGER.debug(LOGGER.name, "onmessageHandler", {action: 'REPLACE'}, {updatePerson: eventDataBody});
					updatePersons(personsRef.current, eventDataBody);
					break;					
				case 'UPDATE':
					LOGGER.debug(LOGGER.name, "onmessageHandler", {action: 'UPDATE'}, {updatePerson: eventDataBody});
					updatePersons(personsRef.current, eventDataBody);
					break;
				case 'DELETE':
					const id = eventData.raw.documentKey._id.value;
					LOGGER.debug(LOGGER.name, "onmessageHandler", {action: 'DELETE'}, {deletedPersonId: id});
					deleteFromPersons(personsRef.current, id);
					break;
				case 'INSERT':
					LOGGER.debug(LOGGER.name, "onmessageHandler", {action: 'INSERT'}, {insertedPerson: eventDataBody});
					insertIntoPersons(personsRef.current, eventDataBody);
					break;
				default:
					LOGGER.debug(LOGGER.name, "onmessageHandler", {action: '<default>'});
					break;
			}

		};
				
		if (dataService){
			dataService.fetchAll().then((data) => setPersons(data));
		}else{
			setPersons([]);
		}
		if (eventService){
			eventService.listen(onmessageHandler);
		}
	}, [setPersons, dataService]);		
	
	
	useEffect(() => {
		personsRef.current = persons;
	},[persons]);
	
	
	const dataSaveHandler = (updatedData) => {
		LOGGER.debug(LOGGER.name, "dataSaveHandler", {updatedData: updatedData});
		dataService.update(updatedData).then( (data) => LOGGER.debug(LOGGER.name, "dataSaveHandler", {dataAfterUpdate: data}));
	}
	
	
	const itemHeader = ({dataItem}) => {
		const LOGGER =  Logger("itemHeader", level.INFO);
		LOGGER.debug(LOGGER.name, {dataItem: dataItem});	
			return (
				<>
				 	<Person data={dataItem} dataSaveHandler={dataSaveHandler} />
				</>
			)					
	}
	
	const itemBody = ({dataItem}) => {
		const LOGGER =  Logger("itemBody", level.INFO);
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