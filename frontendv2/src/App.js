import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminDepartmentsPage from './pages/AdminDepartmentsPage';
import AdminArchivePage from './pages/AdminArchivePage';
import SupervisorUsersPage from './pages/SupervisorUsersPage';
import EmployeePage from './pages/EmployeePage';
import PageNotFound from './pages/PageNotFound';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const navigate = useNavigate();
  const { isLoading, user} = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/login');
      }
    }
  }, [navigate, user, isLoading]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/departments" element={<AdminDepartmentsPage />} />
      <Route path="/admin/archive" element={<AdminArchivePage />} />

      <Route path="/supervisor/users" element={<SupervisorUsersPage />} />
      
      <Route path="/employee" element={<EmployeePage />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
