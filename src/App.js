import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    Map
} from "components/Map";
import {
    Search
} from "components/Search";
import "components/gmap";




const center = {
    lat: -25.363,
    lng: 131.044
};

class App extends Component {
  render() {
    return (
      <div className="App helvetica">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Search />
        <Map center={center} zoom={3}/>
      </div>
    );
  }
}

export default App;
