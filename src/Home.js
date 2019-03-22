import React, { Component } from 'react';
import ButtonAppBar from './ButtonAppBar.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import LineChart from './LineChart.js';

var now = new Date().getTime();
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            items: []
        };
    }

    componentDidMount() {
        /*let websocket = new WebSocket('ws://localhost:1338', 'json');
        console.log("Connecting to: ws://localhost:1338");
        // websocket = new WebSocket(url.value);

        websocket.onopen = function() {
            console.log("The websocket is now open.");
            console.log(websocket);
            console.log("The websocket is now open.");
        };

        websocket.onmessage = function(event) {
            console.log("Receiving stock prices");
            // console.log(event.data);
            let result = JSON.parse(event.data);
            history.push(result[0].price);

            console.log(history);

            // chartData = result.map((item) => {
            //     let dataset = chartData.slice();
            //     dataset.label = 
            // });


            // var oldDataSet = that.state.graphdata.datasets[0];
            // var newData = [];


            // var newDataSet = {
            //     ...oldDataSet
            // };
            that.state.graphdata.datasets[0].data.push(result[0].price)
            // newDataSet.data.push(result[0].price);
            // newDataSet.data = newData;

            // var newState = {    
            //     ...initialState,
            //     datasets: [newDataSet]
            // };

            // that.state.graphdata.datasets = newDataSet;
            // that.setState(newState);

            let listItems = result.map((item) =>
                <ListItem key={item.id} button>
            <Link to={"/item/details/" + item.id}>
                <ListItemText primary={item.name + ", " + item.quantity + " pcs."} secondary={item.price + " SEK"} />
            </Link>
            </ListItem>
            );

            // that.state.data.labels.push(label);
            // that.state.data.datasets.forEach((dataset) => {
            //     dataset.data.push(data);
            // });
            // that.state.data.update();
            // that.setState({
            //     items: listItems
            // });
        };

        websocket.onclose = function() {
            console.log("The websocket is now closed.");
            console.log(websocket);
            console.log("Websocket is now closed.");
        };*/
        let that = this;
        fetch("http://localhost:1338")
            // fetch("https://trader-api.graudusk.me")
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                console.log(result)
                // that.setState({
                //     message: result.description
                // });
            });
    }

    render() {
        return (
            <div>
            <ButtonAppBar site="Home" />
      <main>
        <List>{this.state.items}</List>
        {/*<h1>Home</h1>*/}
        <LineChart />
        <p>{ this.state.message }</p>
      </main>
      </div>
        );
    }
}

export default Home;
