import React, {useState, useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Logger, {level} from 'lib/logger';

const ListDisplay = ({data, itemHeader, itemBody}) => {
	const COMPONENT_NAME = 'ListDisplay';
	const LOGGER = Logger(COMPONENT_NAME, level.INFO);
	const [currentData, setCurrentData] = useState([]);
	
	
	useEffect(()=>{
		const LOGGER = Logger(COMPONENT_NAME);
		LOGGER.debug(LOGGER.name, "data-hook", {currentData: currentData}, {data: data})
		setCurrentData(data);
	},[data])
	
	
	useEffect(()=>{
		const LOGGER = Logger(COMPONENT_NAME);
		LOGGER.debug(LOGGER.name, "currentData-hook", {currentData: currentData}, {data: data})		
	},[currentData])
	
	return (
		<Accordion>
			
			{currentData.map(dataItem =>  
				<Accordion.Item eventKey={dataItem.id} key={dataItem.id} >
					<Accordion.Header>
						{itemHeader({dataItem})}
					</Accordion.Header>
					<Accordion.Body>
						{itemBody({dataItem})}
					</Accordion.Body>
				</Accordion.Item>	
			)}
		</Accordion>
	)
}

export default ListDisplay;