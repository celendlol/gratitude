import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gratitude = props => (
    <tr>
      <td>{props.gratitude.username}</td>
      <td>{props.gratitude.description}</td>
      <td>
        <Link to={"/edit/"+props.gratitude._id}>edit</Link> | <a href="#" onClick={() => { props.deleteGratitude(props.gratitude._id) }}>delete</a>
      </td>
    </tr>
  )

export default class GratitudeList extends Component {

    constructor(props) {
        super(props);
    
        this.deleteGratitude = this.deleteGratitude.bind(this)
    
        this.state = {gratitudes: []};
      }
    
      componentDidMount() {
        axios.get('http://localhost:8080/api/gratitude/')
          .then(response => {
            this.setState({ gratitudes: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }
    
      deleteGratitude(id) {
        axios.delete('http://localhost:8080/api/gratitude/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
            gratitude: this.state.gratitude.filter(el => el._id !== id)
        })
      }
    
      gratitudeList() {
        return this.state.gratitudes.map(currentgratitude => {
          return <Gratitude gratitude={currentgratitude} deleteGratitude={this.deleteGratitude} key={currentgratitude._id}/>;
        })
      }
    
      render() {
        return (
          <div>
            <h3>Logged Gratitudes</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.gratitudeList() }
              </tbody>
            </table>
          </div>
        )
      }
    }