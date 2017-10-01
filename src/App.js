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




class App extends Component {

    componentWillMount () {

        this.setState({
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 4
        });

        this.goTo = location => this.setState(state => {
            console.log("lol");
            return {
                ...state,
                center: location
            };
        });

    }

    render() {
        return (
            <div className="App helvetica">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Search goTo={this.goTo}/>
                <Map {...this.state}/>
            </div>
        );
    }
}

export default App;
