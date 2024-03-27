import React from 'react';

import SimpleGreeting from 'ui/home/demo/simple-greeting';
import Greetings from 'ui/home/demo/greetings';
import InlineTextEdit from 'ui/home/demo/inline-text-edit';
import InlineComboEdit from 'ui/home/demo/inline-combo-edit';

const Demo = () => {
	
	return (
		<>
			<span>
				<h2>Demo-1. Inline Text Edit</h2>
				<InlineTextEdit />				
			</span>
			<hr/>
			<span>
				<h2>Demo-2. Inline Combo Edit</h2>
				<InlineComboEdit />				
			</span>
			<hr/>			
			<span>
				<h2>Demo-3</h2>
				Invoke the Simple-Greeting-API
				<h3>Service Response:</h3> 
				<SimpleGreeting/>
			</span>
			<hr/>
			<span>
				<h2>Demo-4</h2>
				Invoke the Greetings-API
				<h3>Service Response:</h3> 
				<Greetings/>
			</span>
			<hr/>			
			
		</>	
	)

}

export default Demo;