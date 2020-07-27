import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthService from "../services/auth";
import Button from 'react-bootstrap/Button';
import ReactTooltip from "react-tooltip";
import { BsFillCalendarFill } from "react-icons/bs";

const Gratitude = props => (
    <tr>
      <td>{props.gratitude.description}</td>
      <td>
        <Link to={"/edit/"+props.gratitude._id}><Button variant="primary">edit</Button></Link>
        <Button variant="danger" onClick={() => { props.deleteGratitude(props.gratitude._id) }}>delete</Button>
      </td>
      <td>
      <Link to={"/send/"+props.gratitude._id}><Button variant="primary">send</Button></Link>
      </td>
    </tr>
  )

export default class GratitudeList extends Component {

    constructor(props) {
        super(props);
    
        this.deleteGratitude = this.deleteGratitude.bind(this)
    
        this.state = {
          gratitudes: [],
          totalGratitudes: 0
        };
      }
    
      componentDidMount() {
        axios.get('http://localhost:8080/api/gratitude/'+AuthService.getCurrentUser().username)
          .then(response => {
            this.setState({ 
              gratitudes: response.data, 
              totalGratitudes: response.data.length
            })
          })
          .catch((error) => {
            console.log(error);
          })
      }
    
      deleteGratitude(id) {
        axios.delete('http://localhost:8080/api/gratitude/'+id)
          .then(response => { console.log(response.data)});
          
        this.setState({
            gratitudes: this.state.gratitudes.filter(el => el._id !== id)
        })
      }
    
      gratitudeList() {
        return this.state.gratitudes.map(currentgratitude => {
          return <Gratitude gratitude={currentgratitude} deleteGratitude={this.deleteGratitude} key={currentgratitude._id}/>;
        })
      }

      emailGratitude() {
        const emailGratitude = "Email Gratitude "
        return (
          <th>
            { emailGratitude }
            <BsFillCalendarFill data-tip data-for="gratitudeEmail"/>
            <ReactTooltip id="gratitudeEmail" place="top" effect="solid">Unlocked at 20 Gratitudes</ReactTooltip>
          </th>
        )
      }
    
      render() {
        return (
          <div>
            <h3>Logged Gratitudes</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Description</th>
                  <th>Actions</th>
                  { this.emailGratitude() }
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