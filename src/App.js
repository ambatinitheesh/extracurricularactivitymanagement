import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Router,Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './components/Home';
import { Footer } from './components/Footer';
import Events from './components/Events';
function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <Navbar/>
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/events" element={<Events/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
  </div>
  );
}

export default App;
