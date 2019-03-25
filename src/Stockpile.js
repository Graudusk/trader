import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import ButtonAppBar from './ButtonAppBar.js';
import IconButton from '@material-ui/core/IconButton';
const url = window.location.hostname === 'localhost' ? "http://localhost:1338/" : "https://trader-api.graudusk.me/";
const wss = window.location.hostname === 'localhost' ? "ws://localhost:1338/" : "wss://trader-api.graudusk.me/";
// import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            items: [],
            user: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        let that = this;

        // fetch("http://localhost:1338/item/all", {
        fetch(url + "user/stockpile/" + window.localStorage.getItem("user"), {
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
                    // console.log(websocket);
                    // console.log("The websocket is now open.");
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
                            // console.log(tempData, item)
                            if (tempData[i].name === item.name) {
                                tempData[i].price = item.price;
                            }
                        }
                    }
                    that.setState({
                        itemData: tempData
                    });
                    let listItems = that.state.itemData.map((item) =>
                        <ListItem key={item.id} button>

                            <IconButton href={"/item/sell/" +  + item.id} key={item.id} color="inherit" aria-label="Menu">
                                <MonetizationOnIcon  fontSize="large"/>
                            </IconButton>
                            <Link to={"/item/details/" + item.itemId    }>
                                <ListItemText inset={false} primary={item.name + ", " + item.quantity + " pcs."} secondary={item.price + " SEK"} />
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
                    // console.log(websocket);
                    // console.log("Websocket is now closed.");
                };

                websocket.onerror = function() {
                    websocket.close();
                }
            });
    }

    sellItem(event) {
        let that = this;
        let userData = {
            item: that.state.id,
            user: window.localStorage.getItem("user"),
            quantity: that.state.quantity
        };

        this.errors = null;
        if (event) {
            fetch(url + "item/buy", {
            // fetch('https://trader-api.graudusk.me/login', {
                    // fetch('http://localhost:1337/login', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': window.localStorage.getItem("token")
                    },
                    method: 'POST',
                    body: JSON.stringify(userData)
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    that.props.history.push('/items');
                }).catch((err) => {
                    console.log(err);
                });
            event.preventDefault();
        }
    }

    render() {
        if (this.state.itemsList && this.state.itemsList.length > 0) {
            return (
                <div>
                    <ButtonAppBar site="Stockpile" />
                    <main>
                        <h1>{this.state.user}</h1>
                        <List>{this.state.itemsList}</List>
                    </main>
                </div>
            );
        }
        else {
            return (
                <div>
                    <ButtonAppBar site="Stockpile" />
                    <main>
                        <h3>No items in stockpile</h3>
                    </main>
                </div>
            )
        }
    }
}

export default Items;
