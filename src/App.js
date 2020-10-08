import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Logout from './components/Logout'
import LoginStatus from './components/LoginStatus'

function App() {
  return (
    <div className="App">
      <LoginStatus />
      <Login />
      <Logout />
    </div>
  );
}

export default App;
