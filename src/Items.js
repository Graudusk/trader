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
            items: []
        };
    }

    componentDidMount() {
        let that = this;

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
                let listItems = result.data.map((item) =>
                    <ListItem key={item.id} button>
                    <Link to={"/item/details/" + item.id}>
                        <ListItemText primary={item.name} secondary={item.price + " kr"} />
                    </Link>
                    </ListItem>
                );
                that.setState({
                    message: result.description,
                    items: listItems
                });
                console.log(listItems)
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
        <List>{this.state.items}</List>
        <p>{ this.state.message }</p>
      </main>
      </div>
        );
    }
}

export default Items;
