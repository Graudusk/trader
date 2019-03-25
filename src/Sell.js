import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import StorageIcon from '@material-ui/icons/Storage';
import Button from '@material-ui/core/Button';
// import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ButtonAppBar from './ButtonAppBar.js';
const url = window.location.hostname === 'localhost' ? "http://localhost:1338/" : "https://trader-api.graudusk.me/";
const wss = window.location.hostname === 'localhost' ? "ws://localhost:1338/" : "wss://trader-api.graudusk.me/";

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            item: {},
            id: props.match.params.id,
            quantity: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        fetch(url + "user/stockpile/item/" + this.state.id + "/" + window.localStorage.getItem('user'), {
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
                    message: result.description,
                    item: result.data
                });
                let websocket = new WebSocket(wss, 'json');
                console.log("Connecting to: " + wss);
                // websocket = new WebSocket(url.value);

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
                    let result = JSON.parse(event.data);
                    for (let item of result) {
                        if (parseInt(item.id) === parseInt(that.state.id)) {
                            let tempItem = that.state.item;

                            tempItem.price = item.price;

                            that.setState({
                                item: tempItem
                            });
                            return;
                        }
                    }
                }

                websocket.onclose = function() {
                    console.log("The websocket is now closed.");
                    console.log(websocket);
                    console.log("Websocket is now closed.");
                };

                websocket.onerror = function() {
                    websocket.close();
                }

                that.setState({
                    message: result.description,
                    item: result.data
                });
                // console.log(listItems)
            });
    }

    handleSubmit(event) {
        let that = this;
        let itemData = {
            id: that.state.id,
            price: that.state.item.price,
            user: window.localStorage.getItem("user")
        };

        this.errors = null;
        if (event) {
            // let formData = new FormData(this.el);
            // console.log(itemData);
            fetch(url + "item/sell", {
            // fetch('https://trader-api.graudusk.me/login', {
                    // fetch('http://localhost:1337/login', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': window.localStorage.getItem("token")
                    },
                    method: 'POST',
                    // body: formData
                    body: JSON.stringify(itemData)
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    that.props.history.push('/stockpile');
                }).catch((err) => {
                    console.log(err);
                });
            event.preventDefault();
        }
    }

    render() {
        return (
      <div>
            <ButtonAppBar site="Sell item" />
            <main>
                <h2>{this.state.item.name}</h2>
                <List>
                    <ListItem>
                        <Avatar>
                            <BusinessCenter/>
                        </Avatar>
                        <ListItemText primary={ this.state.item.manufacturer } />
                    </ListItem>
                    <ListItem>
                        <Avatar>
                            <AttachMoneyIcon/>
                        </Avatar>
                        <ListItemText primary={ this.state.item.price + " SEK" } />
                    </ListItem>
                    <ListItem>
                        <Avatar>
                            <StorageIcon/>
                        </Avatar>
                        <ListItemText primary={ this.state.item.quantity + " pcs."} />
                    </ListItem>
                </List>
                <h2>Sell item</h2>
                <form onSubmit={this.handleSubmit}>
                    <h3>Total: {parseInt(this.state.item.quantity) * parseInt(this.state.item.price)} SEK</h3>
                    <Button type="submit" variant="contained" color="primary">
                        Sell
                    </Button>
                </form>
            </main>
            </div>
        );
    }
}

export default Items;
