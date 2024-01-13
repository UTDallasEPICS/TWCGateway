import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import AdminPage from './pages/AdminPage'
import SupervisorPage from './pages/SupervisorPage'
import EmployeePage from './pages/EmployeePage'
import RedirectPage from './pages/RedirectPage'
import ProfileModal from './pages/ProfilePage'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

export const ProtectedRoute = ({path, element, user, role}) => {
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (user) {
      axios.post(`http://localhost:5010/checkEmail/`, {email: user.email})
        .then(response => {
          console.log(response)
          console.log(response.data.roleName)
          if (response.data.roleName === role) setIsAuthorized(true)
          else navigate('/login')
        })
        .catch(error => {
          console.log(error)
          navigate('/login')
        })
    }
  }, [user, navigate, role])

  return isAuthorized ? <Route path={path} element={element} /> : <Route path="/login" element={<Login />} />
}


const App = () => {
  
  const navigate = useNavigate()
  const { isLoading, user, isAuthenticated } = useAuth0()

  useEffect(() => {
    if(!isLoading) {
      if (!user) {
        navigate('/login')
      } else {
        console.log(user.email)
        console.log({params: {email: user.email}})
        axios.post(`http://localhost:5010/checkEmail/`, {email: user.email})
          .then(response => {
            console.log(response)
            console.log(response.data.roleName)
            if (response.data.roleName === 'Admin') navigate('/admin')
            else if (response.data.roleName === 'Supervisor') navigate('/supervisor')
            else if (response.data.roleName === 'Employee') navigate('/employee')
            else navigate('/login')
          })
          .catch(error => {
            console.log(error)
            navigate('/login')
          })
      }
   }
  }, [isAuthenticated, navigate, user, isLoading])

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/admin"
        element={<AdminPage />}
      />
      <Route
        path="/supervisor"
        element={<SupervisorPage />}
      /> 
      <Route
        path="/employee"
        element={<EmployeePage />} 
      />
      <Route
        path="/profile"
        element={<ProfileModal />}
      />
    </Routes>
  )
}

export default App
