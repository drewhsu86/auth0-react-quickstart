import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Logout from './components/Logout'
import LoginStatus from './components/LoginStatus'
import RulesViewer from './components/RulesViewer'

function App() {
  return <div className="App">
    <Route path="/" exact>
      <div>
        <LoginStatus />
        <Login />
        <Logout />
      </div>
    </Route>
    <Route path="/rules">
      <RulesViewer />
    </Route>
  </div>
}

export default App;
