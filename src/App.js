import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      isLoaded: false,
      testemail: "",
      testpassword: "",
      token: null,
    }
  }

  componentDidMount() {
    const email = "test@testi.fi";
    const password = "passu";
  
    fetch("https://opendata.hopefully.works/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then(json => {
        this.setState({
          testemail: email,
          testpassword: password,
          isLoaded: true,
          token: json
        });
      })
      .catch(error => console.error(error));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
            </p>
        </header>
        <div>email: {this.state.email} </div>
        <div>password: {this.state.password} </div>
        <div>token: {this.state.token} </div>
      </div>
    );
  }
}

export default App;
