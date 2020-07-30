import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../services/auth'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import { isEmail } from "validator";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

export default class SendGratitude extends Component {
  constructor(props) {
    super(props);

    this.onChangeDestination = this.onChangeDestination.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: AuthService.getCurrentUser().username,
      description: '',
      destination: AuthService.getCurrentUser().email,
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

  onChangeDestination(e) {
    this.setState({
      destination: e.target.value
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
      destination: this.state.destination,
      date: this.state.date
    }

    axios.post('http://localhost:8080/api/email/add', sendGratitude)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Send Gratitude</h3>
      <Form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Description: </label>
          <Input 
              type="text"
              required
              className="form-control"
              value={this.state.description}
              disabled={true}
          />
          <br/>
          <label>Destination: </label>
          <Input 
              type="text"
              className="form-control"
              onChange={this.onChangeDestination}
              value={this.state.destination}
              validations={[required, email]}
          />
          <br/>
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
              minDate={new Date()}
              placeholderText="Select a day"
            />
          </div>
        </div>

        

        <div className="form-group">
          <input type="submit" value="Send Gratitude" className="btn btn-primary" />
        </div>
      </Form>
    </div>
    )
  }
}