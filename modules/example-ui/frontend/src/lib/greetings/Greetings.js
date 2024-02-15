import React, {useState, useEffect} from 'react';

const Greetings = (props) => {
	
	const [greetings, setGreetings] = useState(null);
	
	useEffect(() => {
		const emptyGreetings = [];
		if (props.dataService){
			props.dataService.fetchAll().then((data) => setGreetings(data));
		}else{
			setGreetings(emptyGreetings);
		}		
	}, [setGreetings,props.dataService]);	
	
	return (
		<pre>
			{JSON.stringify(greetings,null,4)}
		</pre>
	)
}

export default Greetings;