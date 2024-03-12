import React, {useState, useEffect} from 'react';
import Logger, {level} from 'lib/logger';
import TextEdit from 'lib/text-edit';
import SaveCancelButtons from 'lib/save-cancel-buttons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Person = ({data, dataSaveHandler}) =>{
	const LOGGER = Logger('Person', level.INFO);
	const [listOfUpdates, setListOfUpdates] = useState([]);
	
	const onUpdateHandler = ({fieldName, updatedValue}) => {
		LOGGER.debug(LOGGER.name, "onUpdateHandler", {fieldName: fieldName}, {updatedValue: updatedValue}, {originalValue: data[fieldName]});
		const isFieldUpdated = (updatedValue !== data[fieldName]);
		LOGGER.debug(LOGGER.name, "onUpdateHandler, before-dirty-list-update", {isFieldUpdated: isFieldUpdated}, {listOfUpdatesLength: listOfUpdates.length});
		var updatedListOfUpdates = listOfUpdates.filter( item => item.fieldName !== fieldName );
		if (isFieldUpdated){
			updatedListOfUpdates = [...updatedListOfUpdates, {fieldName: fieldName, updatedValue: updatedValue}]
		}
		setListOfUpdates(updatedListOfUpdates);
	} 
	
	useEffect(() => {
		const LOGGER = Logger('Person');
		LOGGER.debug(LOGGER.name, "listOfUpdates-hook", {listOfUpdates: listOfUpdates});		
	},[listOfUpdates]);
	
	const updatedDataFromPendingUpdates = (pendingUpdates) => {
		const updatedData = Object.assign({}, data);
		pendingUpdates.map(update => updatedData[update.fieldName] = update.updatedValue);
		LOGGER.debug(LOGGER.name,"updatedDataFromPendingUpdates", {updatedData: updatedData}, {data: data});
		return updatedData;
	}
	
	
	return (
		<>
			<Container fluid="false" style={{width: '1000px'}} >
				<Row>
					<Col >
						<TextEdit fieldName='firstname'
							displayLabel='Firstname'  
							currentValue={data.firstname} 
							onSaveHandler={onUpdateHandler} 
						/>
					</Col>
					
					<Col> 
						<TextEdit fieldName='lastname'
							displayLabel='Lastname'
							currentValue={data.lastname}
							onSaveHandler={onUpdateHandler}
						/>
					</Col>
					
					<Col>
						<TextEdit fieldName='moniker'
							displayLabel='Moniker'
							currentValue={data.moniker}
							onSaveHandler={onUpdateHandler}
						/>
					</Col>
					
					<Col >
						<TextEdit fieldName='gender'
							displayLabel='Gender'
							currentValue={data.gender}
							onSaveHandler={onUpdateHandler}
						/>
					</Col>
				
					<Col>
						<SaveCancelButtons 
							isEnabled={listOfUpdates.length > 0}
							updatedData={updatedDataFromPendingUpdates(listOfUpdates)} 
							onSaveHandler={dataSaveHandler}
						/>
					</Col>
				</Row>
			</Container>	
		</>	
	)	
}

export default Person;