import React from 'react';

import SimpleGreeting from 'ui/home/demo/simple-greeting';
import Greetings from 'ui/home/demo/greetings';
import InlineEdit from 'ui/home/demo/inline-edit';

const Demo = () => {
	
	return (
		<>
			<span>
				<h2>Demo-1. Inline Edit</h2>
				<InlineEdit />				
			</span>
			<hr/>
			<span>
				<h2>Demo-2</h2>
				Invoke the Simple-Greeting-API
				<h3>Service Response:</h3> 
				<SimpleGreeting/>
			</span>
			<hr/>
			<span>
				<h2>Demo-3</h2>
				Invoke the Greetings-API
				<h3>Service Response:</h3> 
				<Greetings/>
			</span>
			<hr/>			
			
		</>	
	)

}

export default Demo;