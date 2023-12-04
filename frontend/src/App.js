import React, {useState} from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Users from './pages/users';
import Departments from './pages/departments';
import Archive from './pages/archive';
import LoginPage from './components/LoginPage';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Unauthorized from './components/UnauthorizedPage';
import Cookies from 'js-cookie';

function RoutesInApp() { //had to call it RoutesInApp because Routes is already defined in react-router-dom
	const location = useLocation();
	const showNavbar = location.pathname !== '/';
  const [userRole, setUserRole] = useState(null);
  console.log("userRole from RoutesInApp before ProtectedElement", userRole)

  function ProtectedElement({ element: Component, roles}) {
    return roles.includes(userRole) ? <Component/> : <Navigate to="/unauthorized" />;
  }

	return (
		<>
			{/* <LoginPage /> */}
			{/* <Navbar /> */}
			{/* <Routes>
				<Route path="/users" element={<Users key="users"/>} />
				<Route path="/departments" element={<Departments />} />
				<Route path="/archive" element={<Archive />} />
			</Routes> */}
      {/* {showNavbar && <Navbar />} */}
      {(userRole === 'Admin' || userRole === 'Supervisor') && <Navbar userRole={userRole}/>}
      <Routes>
        <Route path="/" element={<LoginPage setUserRole={setUserRole} />} />
        {/* <Route path="/navbar" element={<ProtectedElement element={Navbar} roles={['Admin', 'Supervisor']} />} /> */}
        <Route path="/users" element={<ProtectedElement element={() => <Users  userRole={userRole}/>} roles={['Admin', 'Supervisor']} />} />
        <Route path="/departments" element={<ProtectedElement element={() => <Departments userRole={userRole}/>} roles={['Admin', 'Supervisor']}  />} />
        {console.log("userRole from RoutesInApp between ProtectedElement", userRole)}
        <Route path="/archive" element={<ProtectedElement element={() => <Archive userRole={userRole}/>} roles={['Admin', 'Supervisor']}  />} />
        <Route path="/logout" element={<Logout />} />
        {console.log("userRole from RoutesInApp after ProtectedElement", userRole)}
        {/* <Route path="/profile" element={<ProtectedElement element={() => <Profile/>} roles={['Admin', 'Supervisor', 'Employee']} userRole={userRole}  />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/unauthorized" element={<Unauthorized />} />
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