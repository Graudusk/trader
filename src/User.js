import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import InfoIcon from '@material-ui/icons/Info';
// import BusinessCenter from '@material-ui/icons/BusinessCenter';
import StorageIcon from '@material-ui/icons/Storage';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
// import Divider from '@material-ui/core/Divider';
// import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ButtonAppBar from './ButtonAppBar.js';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
const url = window.location.hostname === 'localhost' ? "http://localhost:1338/" : "https://trader-api.graudusk.me/";

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            amount: 0,
            balance: 0
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

        fetch(url + "user/" + window.localStorage.getItem('user'), {
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
                    user: result.data
                });
                // console.log(listItems)
            });
    }

    handleSubmit(event) {
        let that = this;
        let userData = {
            id: this.state.user.id,
            balance: that.state.amount
        };

        this.errors = null;
        if (event) {
            // let formData = new FormData(this.el);
            // console.log(userData);
            fetch(url + "balance", {
                    // fetch('https://trader-api.graudusk.me/login', {
                    // fetch('http://localhost:1337/login', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': window.localStorage.getItem("token")
                    },
                    method: 'PUT',
                    // body: formData
                    body: JSON.stringify(userData)
                })
                // fetch('https://me-api.graudusk.me/login', { method: 'POST', body: JSON.stringify(userData) })
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    that.state.user.balance = parseInt(that.state.user.balance) + parseInt(result.data.balance);

                    that.props.history.push('/user');
                }).catch((err) => {
                    console.log(err);
                });
            event.preventDefault();
        }
    }

    render() {
        return (
            <div>
            <ButtonAppBar site={"User"} />
            <main>
                <List>
                    <ListItem>
                        <Avatar>
                            <PersonOutlineIcon/>
                        </Avatar>
                        <ListItemText primary={ this.state.user.name } />
                    </ListItem>
                    <ListItem>
                        <Avatar>
                            <AlternateEmailIcon/>
                        </Avatar>
                        <ListItemText primary={ this.state.user.email } />
                    </ListItem>
                    <ListItem>
                        <Avatar>
                            <AttachMoneyIcon/>
                        </Avatar>
                        <ListItemText primary={ this.state.user.balance + " SEK" } />
                    </ListItem>

                    {this.state.user.stock !== 0 && (
                        <ListItem>
                            <p>
                            <Fab href="/stockpile" variant="extended" color="primary">
                                {/*<StorageIcon/>*/}
                                See stockpile&nbsp;&nbsp;
                                <Badge badgeContent={this.state.user.stock} color="secondary">
                                    <StorageIcon />
                                </Badge>
                            </Fab>
                            </p>
                        </ListItem>
                    )}
                </List>

                <h2>Deposit money</h2>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="standard-amount-input"
                        label="Amount"
                        type="number"
                        name="amount"
                        // autoComplete="current-email"
                        margin="normal"
                        onChange={this.handleInputChange}
                        fullWidth={true}
                        value={this.state.amount}
                    />
                    <br/>
                    <Button type="submit" variant="contained" color="primary">
                        <AttachMoneyIcon/>
                        Deposit
                    </Button>
                </form>
            </main>
            </div>
        );
    }
}

export default Items;
