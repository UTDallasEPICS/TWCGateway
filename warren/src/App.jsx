import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Messages from './pages/Messages';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <>
      {/*<Navbar/>*/}
      {/* defining routes */}
      <BrowserRouter>
        <Routes>
          <Route path = "/login" element= {<LoginForm/>}/>
          <Route path = "/" element= {<LoginForm/>}/>
          <Route path="/messages" element={<Messages/>}/>
          <Route path="/home" element={<div><Navbar/><Home/></div>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
