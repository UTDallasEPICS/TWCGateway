import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import SupervisorPage from './pages/SupervisorPage';
import EmployeePage from './pages/EmployeePage';
import EmptyPage from './pages/EmptyPage';
import { useAuth0, User } from '@auth0/auth0-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useToast } from '@/components/ui/use-toast';

interface ResponseData {
  roleName: string;
}

type Role = 'Admin' | 'Supervisor' | 'Employee';

const checkEmail = (email: string) =>
  axios.post<ResponseData>(`http://localhost:5010/checkEmail/`, { email });

const navigateBasedOnRole = (role: Role, navigate: (path: string) => void) => {
  const routes: Record<Role, string> = {
    Admin: '/admin',
    Supervisor: '/supervisor',
    Employee: '/employee',
  };
  navigate(routes[role] || '/login');
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isLoading, user, isAuthenticated } = useAuth0<User>();

  useEffect(() => {
    if (!isLoading && user && user.email) {
      checkEmail(user.email)
        .then(response => {
          Cookies.set('role', response.data.roleName);
          navigateBasedOnRole(response.data.roleName as Role, navigate);
        })
        .catch(error => {
          console.log(error);
          toast.toast({
            variant: 'destructive',
            description: 'Login Error',
          });
          navigate('/login');
        });
    } else if (!isLoading && !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, isLoading, toast, navigate]);

  return (
    <Routes>
      <Route path="/" element={<EmptyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/supervisor" element={<SupervisorPage />} />
      <Route path="/employee" element={<EmployeePage />} />
    </Routes>
  );
};

export default App;
