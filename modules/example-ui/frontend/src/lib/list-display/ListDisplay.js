import React, {useState, useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion';

const ListDisplay = ({dataService, itemHeader, itemBody}) => {
	
	const [data, setData] = useState([]);
	
	useEffect(() => {
		const empty = {id:"temp-id-000", message :"No data available"};
		if (dataService){
			dataService.fetchAll().then((data) => setData(data));
		}else{
			setData(empty);
		}		
	}, [setData, dataService]);	
	

	
	return (
		<Accordion>
			{data.map(dataItem =>  
				<Accordion.Item eventKey={dataItem.id} key={dataItem.id} >
					<Accordion.Header>
						{itemHeader({dataItem})}
					</Accordion.Header>
					<Accordion.Body >
						{itemBody({dataItem})}
					</Accordion.Body>
				</Accordion.Item>	
			)}
		</Accordion>
	)
}

export default ListDisplay;