import React from 'react';
import Logger, {level} from 'lib/logger';
import DataService from 'lib/data-service';
import ApiClientConfigs from 'lib/api-client-configs';
import ListDisplay from 'lib/list-display';
import OtherNames from 'ui/home/persons/other-names/OtherNames';
import Person from 'ui/home/persons/person/Person';

const Persons = () => {
	const CONFIG_KEY = "Persons";
	const LOGGER =  Logger(CONFIG_KEY, level.DEBUG);
	
	const dataService = new DataService(new ApiClientConfigs(), CONFIG_KEY);
	
	const onDataSaveHandler = (updatedData) => {
		LOGGER.debug(LOGGER.name, "onDataSaveHandler", {updatedData: updatedData});
		dataService.update(updatedData).then( (data) => LOGGER.debug(LOGGER.name, "onDataSaveHandler", {dataAfterUpdate: data}));
	}
	
	
	const itemHeader = ({dataItem}) => {
		LOGGER.debug("itemHeader", "dataItem", dataItem);	
			return (
				<>
				 	<Person data={dataItem} onDataSaveHandler={onDataSaveHandler} />
				</>
			)					
	}
	
	const itemBody = ({dataItem}) => {
		LOGGER.debug("itemBody", "dataItem", dataItem);
		
		return(
			<>
				<OtherNames data={dataItem.otherNames} />
			</>
		);				
	}
		
	return (
		<>
			<ListDisplay  dataService={dataService} itemHeader={itemHeader} itemBody={itemBody}/>
		</>	
	)

}

export default Persons;