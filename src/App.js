import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    Map
} from "components/Map";
import {
    Form
} from "components/Search";
import "components/gmap";



const url = params => `https://maps.googleapis.com/maps/api/geocode/json?${Object.keys(params)
    .reduce((res, key) => {
        return res + "&" + key + "=" + String(params[key]);
    }, "")}`

const key = process.env.GMAP;

const search = address => {

    return fetch(url({
        key,
        address
    }))
        .then( response => response.json() )
        .then( console.log, console.error );

};


class App extends Component {
  render() {
    return (
      <div className="App helvetica">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Form onSearch={search}/>
        <Map />
      </div>
    );
  }
}

export default App;
