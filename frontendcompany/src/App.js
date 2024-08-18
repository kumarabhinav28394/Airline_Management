
import './App.css';
import Login from './components/Login/Login';
import SignIn from './components/Login/SignIn';
import Home from './components/Home/Home';
import Add from './components/Add/Add';
import UpdateFlight from './components/Update/UpdateFlight';
import UpdateSeats from './components/Update/UpdateSeats';
import Notification from './components/Notifications/Notification';
import CompanyProfile from './components/CompanyProfile/CompanyProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  
  return (
    <Router>
    <div className="">
      <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/add" element={<SignIn/>}/>
      <Route exact path="/Home" element={<Home/>}/>
      <Route exact path="/Addf" element={<Add/>}/>
      <Route exact path="/Notify" element={<Notification/>}/>
      <Route exact path="/updatef" element={<UpdateFlight/>}/>
      <Route exact path="/usercheck" element={<CompanyProfile/>}/>
      <Route exact path="/updateseats/:id" element={<UpdateSeats/>}/>
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
