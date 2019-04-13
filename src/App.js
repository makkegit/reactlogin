import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      logins: []
    }
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {

    var body = {
      email: "testi2@testi2.fi",
      password: "passu2"
    }
    
    axios.post("https://opendata.hopefully.works/api/login", body)
      .then((response) => {
        this.setState({
          logins: response.data
        })
      }).catch((error) => {
        alert("There is an error in API call.");
      });
    }
        
      
  render() {

    
    return (
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <div>id: {this.state.logins.id} </div>
        <div>email: {this.state.logins.email} </div> 
        <div>data: {this.state.logins.accessToken} </div>
        </header>
        
      </div>
    );
  };
};

export default App;
