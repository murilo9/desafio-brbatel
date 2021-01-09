import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Import das pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App = function(){
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
  )
}

export default App;