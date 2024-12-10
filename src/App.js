import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Router,Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './components/Home';
import { Footer } from './components/Footer';
import Events from './components/Events';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import EventDetails from './components/EventDetails'
import Profile from './components/Profile/Profile';
import MyEvents from './components/Events/MyEvents';
import Clubs from './components/Clubs/Clubs';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {window.location.pathname !== '/login' && window.location.pathname !== '/signup' && <Navbar />}  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path="/events/:eventname" element={<EventDetails/>} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/myevents'element={<MyEvents/>}/>
          <Route path="/clubs"element={<Clubs/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
