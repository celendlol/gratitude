import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../services/auth'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditGratitude extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: AuthService.getCurrentUser().username,
      description: '',
      email: AuthService.getCurrentUser().email,
      date: new Date()
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/gratitude/retrieve/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          description: response.data.description
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const sendGratitude = {
      username: this.state.username,
      description: this.state.description,
      email: this.state.email,
      date: this.state.date
    }

    console.log(sendGratitude);

    // axios.put('http://localhost:8080/api/gratitude/update/' + this.props.match.params.id, gratitude)
    //   .then(res => console.log(res.data));

    // window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Send Gratitude</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              disabled={true}
              />
          <br/>
          <label>Email: </label>
          <input  type="text"
              required
              className="form-control"
              onChange={this.onChangeEmail}
              value={this.state.email}
              />
          <br/>
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        

        <div className="form-group">
          <input type="submit" value="Send Gratitude" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}