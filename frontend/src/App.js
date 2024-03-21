import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LoginRedirectPage from './pages/LoginRedirectPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminDepartmentsPage from './pages/AdminDepartmentsPage';
import AdminArchivePage from './pages/AdminArchivePage';
import SupervisorUsersPage from './pages/SupervisorUsersPage';
import SupervisorDepartmentsPage from './pages/SupervisorDepartmentsPage';
import SupervisorArchivePage from './pages/SupervisorArchivePage';
import EmployeePage from './pages/EmployeePage';
import PageNotFound from './pages/PageNotFound';
import RedirectPage from './pages/RedirectPage';
import AdminUserPage from './pages/AdminUserPage';
import UserLogoutPage from './pages/UserLogoutPage';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const navigate = useNavigate();
  const { isLoading, user } = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/login');
      }
    }
  }, [navigate, user, isLoading]);

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<RedirectPage />} />{' '}
      {/*This route because for some reason when the app first loads, it tries to access the root '/'. Since, it wasn't defined before, it flashed the PageNotFound component for a second, and that looks weird.*/}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-redirect" element={<LoginRedirectPage />} />
      <Route path="/user-logout" element={<UserLogoutPage />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/departments" element={<AdminDepartmentsPage />} />
      <Route path="/admin/archive" element={<AdminArchivePage />} />
      <Route path="/supervisor/users" element={<SupervisorUsersPage />} />
      <Route path="/supervisor/departments" element={<SupervisorDepartmentsPage />} />
      <Route path="/supervisor/archive" element={<SupervisorArchivePage />} />
      <Route path="/employee" element={<EmployeePage />} />
      <Route path="admin/user/:id" element={<AdminUserPage />} />
      <Route path="supervisor/user/:id" element={<AdminUserPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  );
};

export default App;
