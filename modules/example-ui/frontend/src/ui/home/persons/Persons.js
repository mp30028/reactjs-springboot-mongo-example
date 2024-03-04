import React from 'react';
import DataService from 'lib/data-service';
import ApiClientConfigs from 'lib/api-client-configs';
import ListDisplay from 'lib/list-display';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Persons = () => {
	const CONFIG_KEY = "Persons";
	const dataService = new DataService(new ApiClientConfigs(), CONFIG_KEY);

	const itemHeader = ({dataItem}) => {	
			return (
				<>
				 	{dataItem.lastname}, {dataItem.firstname}
				</>
			)					
	}
	
	const itemBody = ({dataItem}) => {
			return (
				<>
				 	{dataItem.otherNames.map((otherName) =>
						<Container fluid="false" style={{marginLeft: '1.5rem'}}>
							<Row>
								<Col xl={1} >
									{otherName.value}
								</Col>
								<Col>
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