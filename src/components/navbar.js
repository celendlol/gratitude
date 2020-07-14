import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
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
                <ul className="navbar-nav">
                    <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/register" className="nav-link">Register</Link>
                    </li>
                </ul>
              </div>
            </nav>
          );
    }
}