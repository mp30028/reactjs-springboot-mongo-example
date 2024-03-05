import React from 'react';
import { default  as Logger } from 'loglevel';
import DataService from 'lib/data-service';
import ApiClientConfigs from 'lib/api-client-configs';
import ListDisplay from 'lib/list-display';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Persons = () => {
	const CONFIG_KEY = "Persons";
	const LOGGER = Logger.getLogger(CONFIG_KEY);
	LOGGER.setLevel('INFO');
	
	const dataService = new DataService(new ApiClientConfigs(), CONFIG_KEY);
	
	
	const itemHeader = ({dataItem}) => {
		LOGGER.debug("itemHeader", "dataItem", dataItem);	
			return (
				<>
				 	{dataItem.lastname}, {dataItem.firstname}
				</>
			)					
	}
	
	const itemBody = ({dataItem}) => {
		LOGGER.debug("itemBody", "dataItem", dataItem);
			return (
				<>
				 	{dataItem.otherNames.map((otherName) =>
						<Container key={otherName.id} fluid="false" style={{marginLeft: '1.5rem'}}>
							<Row  style={{width: '250px'}}>
								<Col>
									{otherName.value}
								</Col>
								<Col style={{width: '100px'}}>
									<Badge bg="secondary">
										{otherName.nameType}
									</Badge>
								</Col>
							</Row>
						</Container>
					 )}
				</>
			)					
	}
		
	return (
		<>
			<ListDisplay  dataService={dataService} itemHeader={itemHeader} itemBody={itemBody}/>
		</>	
	)

}

export default Persons;