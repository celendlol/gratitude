import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../services/auth'

export default class CreateGratitude extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: AuthService.getCurrentUser().username,
      description: '',
    }
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const gratitude = {
      username: this.state.username,  
      description: this.state.description,
    }

    console.log(gratitude);

    axios.post('http://localhost:8080/api/gratitude/add', gratitude)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Add New Gratitude</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Add Gratitude" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}