import React from 'react';
import Logger, {level} from 'lib/logger';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import EasyEdit from "react-easy-edit";


const OtherNames = ({data}) =>{
	const LOGGER = Logger("OtherNames", level.INFO);
	LOGGER.debug(LOGGER.name,"data.length", data.length);
	
	return(
		
		<>
		 	{data.map((otherName) =>
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
	);
};

export default OtherNames;