import React, {useState, useEffect} from 'react';
import Logger, {level} from 'lib/logger';
import TextEdit from 'lib/text-edit';
import SaveCancelButtons from 'lib/save-cancel-buttons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Person = ({data, dataSaveHandler}) =>{
	const COMPONENT_NAME = 'Person';
	const LOGGER = Logger(COMPONENT_NAME, level.INFO);
	const [listOfUpdates, setListOfUpdates] = useState([]);
	const [currentData, setCurrentData] = useState(null);
	
	useEffect(()=>{
		setCurrentData(data);
	},[data])
	
	const saveUpdate = ({fieldName, updatedValue}) => {
		LOGGER.debug(LOGGER.name, "saveUpdate", {fieldName: fieldName}, {updatedValue: updatedValue}, {originalValue: data[fieldName]});
		const isFieldUpdated = (updatedValue !== data[fieldName]);
		LOGGER.debug(LOGGER.name, "onUpdateHandler, before-dirty-list-update", {isFieldUpdated: isFieldUpdated}, {listOfUpdatesLength: listOfUpdates.length});
		var updatedListOfUpdates = listOfUpdates.filter( item => item.fieldName !== fieldName );
		if (isFieldUpdated){
			updatedListOfUpdates = [...updatedListOfUpdates, {fieldName: fieldName, updatedValue: updatedValue}]
		}
		setListOfUpdates(updatedListOfUpdates);
		setCurrentData(updatedDataFromPendingUpdates(updatedListOfUpdates));
	} 
	
	useEffect(() => {
		const LOGGER = Logger(COMPONENT_NAME);
		LOGGER.debug(LOGGER.name, "listOfUpdates-hook", {listOfUpdates: listOfUpdates});		
	},[listOfUpdates]);
	
	const updatedDataFromPendingUpdates = (pendingUpdates) => {
		const updatedData = Object.assign({}, data);
		pendingUpdates.map(update => updatedData[update.fieldName] = update.updatedValue);
		LOGGER.debug(LOGGER.name,"updatedDataFromPendingUpdates", {updatedData: updatedData}, {data: data});
		return updatedData;
	}
	
	
	const dataCancelHandler = () => {
		LOGGER.debug(LOGGER.name, "dataCancelHandler", {listOfUpdates: listOfUpdates});
		setListOfUpdates([]);
		setCurrentData(data);
	}
	
	const dataSaveHandlerWrapper = (updatedData) => {
		dataSaveHandler(updatedData);
		setListOfUpdates([]);
	}
	
	return (
		<>
			<Container fluid="false" style={{width: '1000px'}} >
				<Row>
					<Col >
						<TextEdit fieldName='firstname'
							displayLabel='Firstname'  
							value={currentData ? currentData.firstname : ""} 
							saveHandler={saveUpdate}
						/>
					</Col>
					
					<Col> 
						<TextEdit fieldName='lastname'
							displayLabel='Lastname'
							value={currentData ? currentData.lastname : ""}
							saveHandler={saveUpdate}
						/>
					</Col>
					
					<Col>
						<TextEdit fieldName='moniker'
							displayLabel='Moniker'
							value={currentData ? currentData.moniker : ""}
							saveHandler={saveUpdate}
						/>
					</Col>
					
					<Col >
						<TextEdit fieldName='gender'
							displayLabel='Gender'
							value={currentData ? currentData.gender : "MALE"}
							saveHandler={saveUpdate}
						/>
					</Col>
				
					<Col>
						<SaveCancelButtons 
							isEnabled={listOfUpdates.length > 0}
							updatedData={updatedDataFromPendingUpdates(listOfUpdates)} 
							onSaveHandler={dataSaveHandlerWrapper}
							onCancelHandler={dataCancelHandler}
						/>
					</Col>
				</Row>
			</Container>	
		</>	
	)	
}

export default Person;