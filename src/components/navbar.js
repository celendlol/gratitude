import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from "../services/auth";

function Display(props){
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <li className="navbar-item">
        <Link to="/profile" className="nav-link">Profile</Link>
        {/* logout */}
        </li>
  }
  return <ul className="navbar-nav mr-auto"><li className="navbar-item">
  <Link to="/login" className="nav-link">Login</Link>
  <Link to="/register" className="nav-link">Register</Link>
  </li></ul>
}

export default class Navbar extends Component {

  logout(e) {
    AuthService.logout();
    window.location.reload(true);
  }


  render() {

    const isLoggedIn = (AuthService.getCurrentUser() === null) ? false : true;

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/" className="navbar-brand">Gratitude Journal</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                <Link to="/" className="nav-link">Gratitudes</Link>
                </li>
                <li className="navbar-item">
                <Link to="/create-gratitude" className="nav-link">Add Gratitude</Link>
                </li>
            </ul>
            {/* <ul className="navbar-nav"> */}
                {/* <li className="navbar-item">
                <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="navbar-item">
                <Link to="/register" className="nav-link">Register</Link>
                </li> */}
                <Display isLoggedIn={isLoggedIn}/>
                <li className="navbar-item">
                <div onClick={this.logout}>Logout</div>
                </li>
            {/* </ul> */}
          </div>
        </nav>
      );
  }
}