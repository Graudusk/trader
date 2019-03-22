import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import ButtonAppBar from './ButtonAppBar.js';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

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
        this.state.close = true;
        // if(this.state.websocket) this.state.websocket.close();
    }

    componentDidMount() {
        let that = this;
        let websocket = new WebSocket('ws://localhost:1338', 'json');
        console.log("Connecting to: ws://localhost:1338");
        // websocket = new WebSocket(url.value);

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
                console.log(item)
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

        fetch("http://localhost:1338/item/all", {
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
                console.log(result)
                that.state.items = that.state.items.map((item) => {

                });
                // let listItems = result.data.map((item) =>
                //     <ListItem key={item.id} button>
                //     <Link to={"/item/details/" + item.id}>
                //         <ListItemText primary={item.name + ", " + item.quantity + " pcs."} secondary={item.price + " SEK"} />
                //     </Link>
                //     </ListItem>
                // );
                that.setState({
                    itemData: result
                });
                // console.log(listItems)
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
