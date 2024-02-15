import * as React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './ui/home-ui';

const App = () => {	return (
		<>
			<Routes>
				<Route path="/ui/main-app" element={<Home />} /> 
				<Route path="*" element={<p>There's nothing here: 404!</p>} />			
			</Routes>
			
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default App;