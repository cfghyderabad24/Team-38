import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Studentdashboard from './components/studentdashboard';
import UserList from './components/UserList';
import Details from './components/Details';
//import UserList from './components/UserList';


export const store = createContext(null);

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <store.Provider value={{ token, setToken }}>
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Studentdashboard" element={<Studentdashboard />} />
            <Route path="/Userlist" element={<UserList />} />
            <Route path="/Details" element={<Details />} />
          </Routes>
        </Router>
       
             </React.StrictMode>
    </store.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
