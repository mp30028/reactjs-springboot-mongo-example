import React, {useState, useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion';

const ListDisplay = ({data, itemHeader, itemBody}) => {
	
	return (
		<Accordion>
			
			{data.map(dataItem =>  
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