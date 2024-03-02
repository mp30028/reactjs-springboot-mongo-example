import * as React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from 'ui/home';

const App = () => {	return (
		<>
			<link
			  rel="stylesheet"
			  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
			  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
			  crossorigin="anonymous"
			/>		
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