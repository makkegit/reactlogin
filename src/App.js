import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ReactJson from 'react-json-view';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase';


class App extends Component {
  
  constructor(props){
    super(props);   
    this.state ={
      logins: [],
      email: "ei emailia", // no email default
      accessToken: null,
      eventsData: [],

    }
    var config = {
      apiKey: "AIzaSyDqtCLRBAuHtctVy_kePjm-IzUi8X6Ma_E",
      authDomain: "sensorinfo-735d3.firebaseapp.com",
      databaseURL: "https://sensorinfo-735d3.firebaseio.com",
      projectId: "sensorinfo-735d3",
      storageBucket: "sensorinfo-735d3.appspot.com",
      messagingSenderId: "403368641577"
    };
    firebase.initializeApp(config);
  }

  componentDidMount() {
    this.getUserData();
    this.postLogin();
    this.timer =  setInterval(() => this.getInfoWithToken(), 3600000);
    
  }
  componentDidUpdate(prevProps, prevState) {
    // check on previous state
    // only write when it's different with the new state
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }
  writeUserData = () => {
    firebase.database().ref('/').set(this.state);
    console.log('DATA SAVED');
  }
  
  getUserData = () => {
    let ref = firebase.database().ref('/');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
    console.log('DATA RETRIEVED');
  }

  postLogin = () => {
    
    axios.post("https://opendata.hopefully.works/api/login", { // api/signup for new users
        //test user 
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
        <Button variant="primary" size="lg" onClick={this.getInfoWithToken} block>Click to update! Data goes to firebase</Button>
          <img src={logo} className="App-logo" alt="logo" />
        <div>id: {this.state.logins.id} </div>
        <div>email: {this.state.logins.email} </div> 
        <div style={{fontSize: "20px"}}>accessToken: {this.state.logins.accessToken} </div>
        </header>
      </div>
    );
  };
};

export default App;
