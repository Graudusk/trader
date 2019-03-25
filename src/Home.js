import React, { Component } from 'react';
import ButtonAppBar from './ButtonAppBar.js';

import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import LineChart from './LineChart.js';
const url = window.location.hostname === 'localhost' ? "http://localhost:1338/" : "https://trader-api.graudusk.me/";

// var now = new Date().getTime();
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            items: []
        };
    }

    componentDidMount() {
        let that = this;
        fetch(url)
            // fetch("https://trader-api.graudusk.me")
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                that.setState({
                    message: result.description
                });
            });
    }

    render() {
        return (
            <div>
            <ButtonAppBar site="Home" />
      <main>
        <h2>{ this.state.message }</h2>
        <List>{this.state.items}</List>
        {/*<h1>Home</h1>*/}
        <LineChart />
      </main>
      </div>
        );
    }
}

export default Home;
