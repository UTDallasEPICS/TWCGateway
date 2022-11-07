import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Messages from './pages/Messages';
import LoginForm from './components/LoginForm';
import TaskForm from './components/TaskForm';
import Account from './pages/Account';
import CurrentOnboarding from './pages/CurrentOnboarding';
import FullLayout from './layouts/FullLayout';
import NewEmployeeForm from './pages/NewEmployeeForm.js';
import NewSupervisorForm from './pages/NewSupervisorForm.js';
import DefaultTasks from './pages/DefaultTasks';
import  Home_newhire from './pages/Home_newhire'; 
import Navbar_newhire from './components/Navbar_newhire';

import { Container } from 'reactstrap';


function App() {
  
  return (
    <>
     
      { /*defining routes*/ }
      <BrowserRouter>
        <Routes>
          <Route path = "/login" element= {<LoginForm/>}/>
          <Route path = "/" element= {<LoginForm/>}/>
          <Route path="/messages" element={<Messages/>}/>
          <Route path= "/home_newhire" element = {<div><Navbar_newhire/><Home_newhire/><Container><CurrentOnboarding/></Container></div>}/>
          <Route path="/home" element={<div><Navbar/><Home/><Container><CurrentOnboarding/></Container></div>}/>
          <Route path= "/admin" element={ <div><Navbar/><FullLayout/></div>}>
            <Route path="/admin/Account" element={<Account/>}/>
            <Route path='/admin/Account/ChangePassword' element = {<div></div>}/>
            <Route path='/admin/Account/EditInformation' element = {<div></div>}/>
            <Route path='/admin/CurrentOnboarding' element={<CurrentOnboarding/>} />
            <Route path='/admin/NewEmployeeForm' element = {<NewEmployeeForm/>}/>
            <Route path='/admin/DefaultTasks' element = {<DefaultTasks/>}/>
            <Route path='/admin/NewSupervisorForm' element = {<NewSupervisorForm/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;

