import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./Home.css";
import Demo from 'ui/home/demo';
import Persons from 'ui/home/persons';

function Home() {
	return (
		<Tabs>
			<TabList>
				<Tab key={1}>Main App</Tab>
				<Tab key={2}>Demos, examples etc</Tab>
			</TabList>

			<TabPanel key={1}>
				<Persons />
			</TabPanel>
			
			<TabPanel key={2}>
				<Demo />
			</TabPanel>
		</Tabs>
	);
};

export default Home;