import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    Message1,
    Message2
} from "components/Message";
import {
    Map
} from "components/Map";
import "components/gmap";


const noop = () => {};

const url = params => `https://maps.googleapis.com/maps/api/geocode/json?${Object.keys(params)
    .reduce((res, key) => {
        return res + "&" + key + "=" + String(params[key]);
    }, "")}`
const key = process.env.GMAP;
const search = address => {

    return fetch(url({
        key: process.env.GMAP,
        address
    }))
        .then( response => response.json() )
        .then( console.log, console.error );

};
export class Form extends React.Component {
    render () {
        const { onSearch = noop } = this.props;
        return (
            <form onSubmit={e => {
                e.preventDefault();
                onSearch(e.currentTarget.elements.place.value);
            }}>
            <input type="text" name="place"/>
            <input type="submit" value="Go !"/>
        </form>
        );

    }
}


class App extends Component {
  render() {
    return (
      <div className="App helvetica">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Form onSearch={search}/>
        <Message1 
            message="world"
        />
        <Message2 
            message="cruel world"
        />
        <Map />
      </div>
    );
  }
}

export default App;
