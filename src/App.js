import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from './components/navbar'
import Register from './components/register'
import Login from './components/login'
import GratitudeList from './components/gratitude-list'
import CreateGratitude from './components/create-gratitude'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={GratitudeList}/>
        <Route path="/create-gratitude" component={CreateGratitude}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
      </div>
    </Router>
  );
}

export default App;