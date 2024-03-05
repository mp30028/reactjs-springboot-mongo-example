import * as React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Demo from 'ui/home/demo';
import Persons from 'ui/home/persons';

function Home() {
	return (
		<Tabs>

				<Tab eventKey={1} title="Main App">
					<Persons /> 
				</Tab>
				<Tab eventKey={2} title="Demos, examples etc">
					<Demo />
				</Tab>
		</Tabs>
	);
};

export default Home;