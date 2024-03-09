import React, {useState, useEffect} from 'react';
import Logger, {level} from 'lib/logger';
import TextEdit from 'lib/text-edit';
import SaveCancelButtons from 'lib/save-cancel-buttons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Person = ({data}) =>{
	const LOGGER = Logger('Person', level.DEBUG);
	const [dirtyList, setDirtyList] = useState([]);
	
	const onUpdateHandler = ({fieldName, updatedValue}) => {
		LOGGER.debug(LOGGER.name, "onUpdateHandler", {fieldName: fieldName}, {updatedValue: updatedValue}, {originalValue: data[fieldName]});
		var isFieldDirty = (updatedValue !== data[fieldName]);
		LOGGER.debug(LOGGER.name, "onUpdateHandler, before-dirty-list-update", {isFieldDirty: isFieldDirty}, {dirtyListLength: dirtyList.length});
		var updatedDirtyList = dirtyList.filter( item => item !== fieldName );
		if (isFieldDirty){
			updatedDirtyList = [...updatedDirtyList, fieldName]
		}
		setDirtyList(updatedDirtyList);

	} 
	
	useEffect(() => {
		const LOGGER = Logger('Person');
		LOGGER.debug(LOGGER.name, "dirtyList-hook", {dirtyList: dirtyList});		
	},[dirtyList]);
	
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
						<SaveCancelButtons isEnabled={dirtyList.length > 0} />
					</Col>
				</Row>
			</Container>	
		</>	
	)	
}

export default Person;


/* --------------------------------------------------------------------------------------------------- */
//	const TextFieldEdit = ({fieldName, displayLabel, currentValue, onUpdateHandler}) =>{
//		const LOGGER = Logger('TextFieldEdit', LogLevel.DEBUG);
//		LOGGER.debug(LOGGER.name,{fieldName: fieldName}, {displayLabel: displayLabel}, {currentValue: currentValue});
//		
//		const onSaveHandler = (updatedValue) => {		
//			LOGGER.debug(LOGGER.name, "onSaveHandler", {fieldName: fieldName}, {currentValue: currentValue}, {updatedValue: updatedValue});
//			if (onUpdateHandler) onUpdateHandler({fieldName: fieldName, updatedValue: updatedValue})
//		};
//
//		const onCancelHandler = () => {
//			LOGGER.debug(LOGGER.name, "onCancelHandler", {fieldName: fieldName},);		
//		};		
//		
//		
//		return (
//			<>
//				<TextEdit 
//					label={displayLabel}
//					currentValue={currentValue}
//					onSaveHandler={onSaveHandler}
//					onCancelHandler={onCancelHandler}
//				/>
//			</>
//		)
//	}


/* --------------------------------------------------------------------------------------------------- */
//	const LastnameEdit = ({currentValue}) =>{
//		const LOGGER = Logger('LastnameEdit', 'INFO');
//		LOGGER.debug(LOGGER.name, "currentValue =", currentValue);
//		return (
//			<>
//				<TextEdit currentValue={currentValue} label="Lastname" />
//			</>
//		)
//	}


/* --------------------------------------------------------------------------------------------------- */
//	const MonikerEdit = ({currentValue}) =>{
//		const LOGGER = Logger('MonikerEdit','INFO');
//		LOGGER.debug(LOGGER.name, "currentValue =", currentValue);
//		return (
//			<>
//				<TextEdit currentValue={currentValue} label="Moniker" />
//			</>
//		)
//	}


/* --------------------------------------------------------------------------------------------------- */
//	const GenderEdit = ({currentValue}) =>{
//		const LOGGER = Logger('GenderEdit', 'INFO');
//		LOGGER.debug(LOGGER.name, "currentValue =", currentValue);
//		return (
//			<>
//				<TextEdit currentValue={currentValue} label="Gender" />
//			</>
//		)
//	}


/* --------------------------------------------------------------------------------------------------- */