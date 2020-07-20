import React, { Component } from 'react';
import axios from 'axios';

export default class EditGratitude extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/gratitude/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description
        })   
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })

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
      description: this.state.description
    }

    axios.put('http://localhost:8080/api/gratitude/update/' + this.props.match.params.id, gratitude)
      .then(res => console.log(res.data));

     window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Gratitude Log</h3>
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
          <input type="submit" value="Edit Gratitude Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}