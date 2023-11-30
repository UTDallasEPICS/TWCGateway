import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Users from './pages/users';
import Departments from './pages/departments';
import Archive from './pages/archive';
import LoginPage from './components/LoginPage';
import Logout from './components/Logout';
import Profile from './components/Profile';

function RoutesInApp() { //had to call it RoutesInApp because Routes is already defined in react-router-dom
	const location = useLocation();
	const showNavbar = location.pathname !== '/';

	return (
		<>
			{/* <LoginPage /> */}
			{/* <Navbar /> */}
			{/* <Routes>
				<Route path="/users" element={<Users key="users"/>} />
				<Route path="/departments" element={<Departments />} />
				<Route path="/archive" element={<Archive />} />
			</Routes> */}
			{showNavbar && <Navbar />}
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/navbar" element={<Navbar />} />
				{/* <Tab><Link to="/users">Users</Link></Tab>
				<Tab><Link to="/departments">Departments</Link></Tab>
				<Tab><Link to="/archive">Archive</Link></Tab>
				<Tab><Link to="/login">LogIn</Link></Tab>
				<Tab><Link to="/logout">LogOut</Link></Tab>
				<Tab><Link to="/profile">Profile</Link></Tab> */}
				<Route path="/users" element={<Users />} />
				<Route path="/departments" element={<Departments />} />
				<Route path="/archive" element={<Archive />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</>
	);
}

function App(){
	return (
		<Router>
			<RoutesInApp />
		</Router>
	)
}

export default App;