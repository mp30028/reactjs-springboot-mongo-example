import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./static/css/HirefourTabs.css";
import Greeting from './tryouts/Greeting';

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
					Invokes the applications core service Greetings-API
					<h3>Service Response:</h3> 
					<p>&gt;&gt;&gt;&gt; <Greeting/></p>
				<hr/>
			</TabPanel>
		</Tabs>
	);
};

export default Home;