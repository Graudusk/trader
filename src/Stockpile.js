import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InfoIcon from '@material-ui/icons/Info';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import StorageIcon from '@material-ui/icons/Storage';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import ButtonAppBar from './ButtonAppBar.js';
import IconButton from '@material-ui/core/IconButton';
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
        console.log(this.props)

        fetch("http://localhost:1338/user/stockpile/" + window.localStorage.getItem("user"), {
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

                        <IconButton href={"/item/sell/" +  + item.id} key={item.id} color="inherit" aria-label="Menu">
                            <MonetizationOnIcon  fontSize="large"/>
                        </IconButton>
                        <Link to={"/item/details/" + item.itemId    }>
                            <ListItemText inset={false} primary={item.name + ", " + item.quantity + " pcs."} secondary={item.price + " kr"} />
                        </Link>
                    </ListItem>
                );
                that.setState({
                    message: result.description,
                    items: listItems,
                    user: window.localStorage.getItem('email')
                });
                console.log(listItems);
            });
    }



    sellItem(event) {
        let that = this;
        let userData = {
            item: that.state.id,
            user: window.localStorage.getItem("user"),
            quantity: that.state.quantity
        };

        console.log('A name was submitted: ' + this.state.email);
        this.errors = null;
        if (event) {
            // let formData = new FormData(this.el);
            // console.log(userData);
            fetch("http://localhost:1338/item/buy", {
            // fetch('https://trader-api.graudusk.me/login', {
                    // fetch('http://localhost:1337/login', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': window.localStorage.getItem("token")
                    },
                    method: 'POST',
                    // body: formData
                    body: JSON.stringify(userData)
                })
                // fetch('https://me-api.graudusk.me/login', { method: 'POST', body: JSON.stringify(userData) })
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    // this.setState({
                    //     [email]: result.data.user.email,
                    //     [token]: result.data.user.token
                    // });
                    // router.go('/');
                    // if (result.status == 200) {
                    // that.$router.push('/');

                    that.props.history.push('/items');
                    // that.forceUpdate()
                    // }
                }).catch((err) => {
                    console.log(err);
                });
            event.preventDefault();
        }
    }

    /*

    handleSubmit(event) {
        let that = this;
        let userData = {
            item: that.state.id,
            user: window.localStorage.getItem("user"),
            quantity: that.state.quantity
        };

        console.log('A name was submitted: ' + this.state.email);
        this.errors = null;
        if (event) {
            // let formData = new FormData(this.el);
            // console.log(userData);
            fetch("http://localhost:1338/item/buy", {
            // fetch('https://trader-api.graudusk.me/login', {
                    // fetch('http://localhost:1337/login', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': window.localStorage.getItem("token")
                    },
                    method: 'POST',
                    // body: formData
                    body: JSON.stringify(userData)
                })
                // fetch('https://me-api.graudusk.me/login', { method: 'POST', body: JSON.stringify(userData) })
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    // this.setState({
                    //     [email]: result.data.user.email,
                    //     [token]: result.data.user.token
                    // });
                    // router.go('/');
                    // if (result.status == 200) {
                    // that.$router.push('/');

                    that.props.history.push('/items');
                    // that.forceUpdate()
                    // }
                }).catch((err) => {
                    console.log(err);
                });
            event.preventDefault();
        }
    }*/

    render() {
        if (this.state.items) {

        return (
      <div>
            <ButtonAppBar site="Stockpile" />
            <main>
                <h1>{this.state.user}</h1>
                <List>{this.state.items}</List>
            </main>
            </div>
        );
        }
        else {
            return (<main>
                <h3>No items in stockpile</h3>
            </main>)
        }
    }
}

export default Items;
