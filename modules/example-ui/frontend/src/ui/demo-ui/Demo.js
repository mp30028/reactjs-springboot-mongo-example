import React from 'react';

import SimpleGreeting from '../simple-greeting-ui';
import Greetings from '../greetings-ui'

const Demo = () => {
	
	return (
		<>
			<span>
				<h2>Demo-1</h2>
				Invoke the Simple-Greeting-API
				<h3>Service Response:</h3> 
				<SimpleGreeting/>
			</span>
			<hr/>
			<span>
				<h2>Demo-2</h2>
				Invoke the Greetings-API
				<h3>Service Response:</h3> 
				<Greetings/>
			</span>
			<hr/>			
			
		</>	
	)

}

export default Demo;