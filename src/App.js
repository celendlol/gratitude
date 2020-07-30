import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import AuthService from "./services/auth";

import Navbar from './components/navbar'
import Register from './components/register'
import Login from './components/login'
import GratitudeList from './components/gratitude-list'
import CreateGratitude from './components/create-gratitude'
import Profile from './components/profile'
import EditGratitude from './components/edit-gratitude'
import SendGratitude from './components/send-gratitude'

class App extends Component {

  state = {
    loggedIn: true
  }

  componentDidMount() {
    if (AuthService.getCurrentUser() === null) {
      this.setState({
        loggedIn: false
      });
    }
  }

  render(){
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route exact path="/" render={() =>(
            this.state.loggedIn ? ( <Route  component={GratitudeList} />) : (<Route component={Login} />)
          )} />
          <Route exact path="/edit/:id" render={() =>(
            this.state.loggedIn ? ( <Route  component={EditGratitude} />) : (<Route component={Login} />)
          )} />
          <Route exact path="/create-gratitude" render={() =>(
            this.state.loggedIn ? ( <Route  component={CreateGratitude} />) : (<Route component={Login} />)
          )} />
          <Route exact path="/send/:id" render={() =>(
            this.state.loggedIn ? ( <Route  component={SendGratitude} />) : (<Route component={Login} />)
          )} />
          <Route path="/profile" component={Profile}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          

        </div>
      </Router>
    );
  }
}

export default App;
