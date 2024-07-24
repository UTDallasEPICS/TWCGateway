import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from '@/pages/Login';
import LoginRedirect from '@/pages/LoginRedirect';
import Users from '@/pages/admin/Users';
import Departments from '@/pages/admin/Departments';
import Department from '@/pages/admin/Department';
import Archive from '@/pages/admin/Archive';
import EmployeeHomepage from '@/pages/employee/EmployeeHomepage';
import OnboardingEmployee from './pages/admin/OnboardingEmployee';
import Supervisor from './pages/admin/Supervisor';
import ArchivedOnboardingEmployee from './pages/admin/ArchivedOnboardingEmployee'
import ArchivedSupervisor from './pages/admin/ArchivedSupervisor'
import SupervisorHomepage from './pages/supervisor/SupervisorHomepage';

function App() {
  const { isAuthenticated, error } = useAuth0();
  console.log({error})
  if (!isAuthenticated) {
    return <button onClick={() => loginWithRedirect()}>Log in</button>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <LoginRedirect /> : <Login />}
        />
        <Route path="/login-redirect" element={<LoginRedirect />} />
        <Route path="/admin/users" element={<Users />} />
        <Route
          path="/admin/onboarding-employee/:id"
          element={<OnboardingEmployee />}
        />
        <Route path="/admin/supervisor/:id" element={<Supervisor />} />
        <Route path="/admin/departments" element={<Departments />} />
        <Route path="/admin/department/:id" element={<Department />} />
        <Route path="/admin/archive" element={<Archive />} />
        <Route path="/admin/archived-onboarding-employee/:id" element={<ArchivedOnboardingEmployee />}/>
        <Route path="/admin/archived-supervisor/:id" element={<ArchivedSupervisor/>}/>
        <Route path="/supervisor" element={<SupervisorHomepage />} />
        <Route path="/onboarding-employee" element={<EmployeeHomepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
