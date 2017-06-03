import React, { Component } from 'react';
import Map from 'google-maps-react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Guiness travel guide</h2>
        </div>

        <p className="App-intro">
          test
        </p>
        <div>
        <Map google={window.google} zoom={14} />
        </div>
      </div>

    );
  }
}

export default App;
