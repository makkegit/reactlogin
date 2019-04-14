import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ReactJson from 'react-json-view';
import Button from 'react-bootstrap/Button';

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      logins: [],
      email: "ei emailia", // no email default
      accessToken: null,
      eventsData: [],

    }
  }

  componentDidMount() {
    this.postLogin();
  }

  postLogin = () => {
    
    axios.post("https://opendata.hopefully.works/api/login", { // api/signup for new users
        //test user eyJLs
        email: "testi123@testi123.fi", 
        password: "passu1234"        
    })
      .then((response) => {
        this.setState({
          logins: response.data,
          email: response.data.email,
          accessToken: response.data.accessToken

        })
      }).catch((error) => {
        alert("There is an error in API call.");
      });
    }
  
  getInfoWithToken = () => {
    axios.get("https://opendata.hopefully.works/api/events", {
      headers: { "Authorization" : `Bearer ${this.state.accessToken}` } })
      .then(res => {
        console.log(res.data);
      this.setState({
        eventsData: res.data
      })})
  }
  
        
      
  render() {
    
    return (
      
      <div className="App">
      <div>testi email: {this.state.email}</div>
        <header className="App-header">
        <div>eventdata: </div>
        <ReactJson theme="ocean" src={this.state.eventsData} />
        <Button variant="primary" size="lg" onClick={this.getInfoWithToken} block>Click for magic!</Button>
          <img src={logo} className="App-logo" alt="logo" />
        <div>id: {this.state.logins.id} </div>
        <div>email: {this.state.logins.email} </div> 
        <div fontSize="20px">accessToken: {this.state.logins.accessToken} </div>
        </header>
      </div>
    );
  };
};

export default App;
