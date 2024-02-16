import React, {useState, useEffect} from 'react';

const RawDisplay = (props) => {
	
	const [data, setData] = useState(null);
	
	useEffect(() => {
		const empty = {id:"temp-id-000", message :"No data available"};
		if (props.dataService){
			props.dataService.fetchAll().then((data) => setData(data));
		}else{
			setData(empty);
		}		
	}, [setData,props.dataService]);	
	
	return (
		<pre>
			{JSON.stringify(data,null,4)}
		</pre>
	)
}

export default RawDisplay;