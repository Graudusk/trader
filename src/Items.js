import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import ButtonAppBar from './ButtonAppBar.js';
const url = window.location.hostname === 'localhost' ? "http://localhost:1338/" : "https://trader-api.graudusk.me/";
const wss = window.location.hostname === 'localhost' ? "ws://localhost:1338/" : "wss://trader-api.graudusk.me/";

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            itemsList: [],
            close: false,
            itemData: []
        };
    }

    componentWillUnmount() {
        console.log("closing")
        // this.state.close = true;
        this.setState({
            close: true
        })
        // if(this.state.websocket) this.state.websocket.close();
    }

    componentDidMount() {
        let that = this;

        fetch(url + "item/all", {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': window.localStorage.getItem('token')
                }
            })
            // fetch("https://trader-api.graudusk.me")
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                that.setState({
                    itemData: result.data
                });
                let websocket = new WebSocket(wss, 'json');
                console.log("Connecting to: " + wss);

                websocket.onopen = function() {
                    console.log("The websocket is now open.");
                    console.log(websocket);
                    console.log("The websocket is now open.");
                };

                websocket.onmessage = function(event) {
                    if (that.state.close) {
                        websocket.close();
                        return;
                    }
                    console.log("Receiving stock prices");
                    let result = JSON.parse(event.data);
                    let tempData = that.state.itemData;
                    for (let item of result) {
                        for (let i in tempData) {
                            if (tempData[i].name === item.name) {
                                tempData[i].price = item.price;
                            }
                        }
                    }
                    let listItems = that.state.itemData.map((item) =>
                        <ListItem key={item.id} button>
                            <Link to={"/item/details/" + item.id}>
                                <ListItemText primary={item.name + ", " + item.quantity + " pcs."} secondary={item.price + " SEK"} />
                            </Link>
                        </ListItem>
                    );
                    that.setState({
                        message: result.description,
                        itemsList: listItems
                    });
                }

                websocket.onclose = function() {
                    console.log("The websocket is now closed.");
                    console.log(websocket);
                    console.log("Websocket is now closed.");
                };

                websocket.onerror = function() {
                    websocket.close();
                }
            });
    }

    ItemList(props) {
        const items = props.items;
        const listItems = items.map((number) =>
            <li key={number.toString()}>
      {number}
    </li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }

    render() {
        return (
      <div>
            <ButtonAppBar site="Items" />
            <main>
        <h1>Items</h1>
        <List>{this.state.itemsList}</List>
        <p>{ this.state.message }</p>
      </main>
      </div>
        );
    }
}

export default Items;
