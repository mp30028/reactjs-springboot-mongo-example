import React, {useState, useEffect} from 'react';

const SimpleGreeting = (props) => {
	
	const [greeting, setGreeting] = useState(null);
	
	useEffect(() => {
		const emptyGreeting = {id:"temp-id-000", username: "--UNKNOWN--", message :"", timeOfGreeting :""};
		if (props.dataService){
			props.dataService.fetchAll().then((data) => setGreeting(data));
		}else{
			setGreeting(emptyGreeting);
		}		
	}, [setGreeting,props.dataService]);	
	
	return (
		<pre>
			{JSON.stringify(greeting,null,4)}
		</pre>
	)
}

export default SimpleGreeting;