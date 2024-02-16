import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./Home.css";
import Demo from 'ui/home/demo';

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
				<Demo />
			</TabPanel>
		</Tabs>
	);
};

export default Home;