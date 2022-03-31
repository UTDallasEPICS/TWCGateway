import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Messages from './pages/Messages';

function App() {
  return (
    <>
      <Navbar/>
      {/* defining routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/messages" element={<Messages/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
