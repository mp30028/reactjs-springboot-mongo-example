import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./Home.css";
import SimpleGreeting from '../simple-greeting-ui';

function Home() {
	return (
		<Tabs>
			<TabList>
				<Tab key={1}>Bookings Management</Tab>
				<Tab key={2}>Demos, examples etc</Tab>
			</TabList>

			<TabPanel key={1}>
				<h2>Core app to manage bookings will go here</h2>
			</TabPanel>
			
			<TabPanel key={2}>
				<h2>Demo-1</h2>
					Invokes the Simple-Greeting-API
					<h3>Service Response:</h3> 
					<SimpleGreeting/>
				<hr/>
			</TabPanel>
		</Tabs>
	);
};

export default Home;