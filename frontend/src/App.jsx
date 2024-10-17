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
import ArchivedOnboardingEmployee from './pages/admin/ArchivedOnboardingEmployee';
import ArchivedSupervisor from './pages/admin/ArchivedSupervisor';
import SupervisorHomepage from './pages/supervisor/SupervisorHomepage';
import QrCodePage from './pages/tracking/QrCodePage';
import InventoryPage from './pages/tracking/InventoryPage';
import CheckoutPage from './pages/tracking/CheckoutPage';
import Cookies from 'js-cookie';
import { nanoid } from 'nanoid';

let state = {};
const genState = () => {
  const s = nanoid();
  state[s] = 1;
  return s;
};

const verifyNonce = nonce => {
  if (state[nonce]) {
    delete state[nonce];
    return true;
  }
  return false;
};

function App() {
  const { isAuthenticated, error, loginWithRedirect } = useAuth0();

  const token = Cookies.get('token');
  if (!token && !window.location.href.includes('/login-redirect')) {
    loginWithRedirect();
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
        <Route
          path="/admin/archived-onboarding-employee/:id"
          element={<ArchivedOnboardingEmployee />}
        />
        <Route
          path="/admin/archived-supervisor/:id"
          element={<ArchivedSupervisor />}
        />
        <Route path="/admin/generate-qr-code/:id" element={<QrCodePage />} />
        <Route path="/admin/inventory-page" element={<InventoryPage />} />
        <Route path="/admin/checkout/:serialNumber" element={<CheckoutPage />} />
        <Route path="/supervisor" element={<SupervisorHomepage />} />
        <Route path="/onboarding-employee" element={<EmployeeHomepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
