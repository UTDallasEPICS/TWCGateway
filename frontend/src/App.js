import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './pages/users';
import Departments from './pages/departments';
import Archive from './pages/archive';

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/users" element={<Users key="users"/>} />
				<Route path="/departments" element={<Departments />} />
				<Route path="/archive" element={<Archive />} />
			</Routes>
		</Router>
	);
}

export default App;