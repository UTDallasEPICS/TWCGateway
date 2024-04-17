import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from '@/pages/Login';
import LoginRedirect from '@/pages/LoginRedirect';
import Users from '@/pages/admin/Users';
import Departments from '@/pages/admin/Departments';
import Department from '@/pages/admin/Department';
import Archive from '@/pages/admin/Archive';
import PlaceholderSu from '@/pages/supervisor/PlaceholderSu';
import PlaceholderEm from '@/pages/employee/PlaceholderEm';
import OnboardingEmployee from './pages/admin/OnboardingEmployee';
import Supervisor from './pages/admin/Supervisor';

function App() {
  const { isAuthenticated } = useAuth0();
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
        <Route path="/admin/supervisor/:id" element={<Supervisor />}/>
        <Route path="/admin/departments" element={<Departments />} />
        <Route path="/admin/department/:id" element={<Department />} />
        <Route path="/admin/archive" element={<Archive />} />
        <Route path="/supervisor/placeholder" element={<PlaceholderSu />} />
        <Route path="/employee/placeholder" element={<PlaceholderEm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
