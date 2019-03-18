import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InfoIcon from '@material-ui/icons/Info';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import StorageIcon from '@material-ui/icons/Storage';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
// import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            amount: 0
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
        console.log(this.props)

        fetch("http://localhost:1338/user/" + window.localStorage.getItem('user'), {
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
        console.log(userData)

        this.errors = null;
        if (event) {
            // let formData = new FormData(this.el);
            // console.log(userData);
            fetch("http://localhost:1338/balance", {
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
                    // this.setState({
                    //     [email]: result.data.user.email,
                    //     [token]: result.data.user.token
                    // });
                    // router.go('/');
                    // if (result.status == 200) {
                    // that.$router.push('/');
                    console.log(result.balance)
                    that.setState({
                        ["user"]["balance"]: that.state.user.balance + result.balance
                    });

                    that.props.history.push('/user');
                    // that.forceUpdate()
                    // }
                }).catch((err) => {
                    console.log(err);
                });
            event.preventDefault();
        }
    }

    render() {
        return (
            <main>
                <p>{this.state.user.email}</p>
                <List>
                    <ListItem>
                        <Avatar>
                            <AttachMoneyIcon/>
                        </Avatar>
                        <ListItemText primary={ this.state.user.balance } />
                    </ListItem>
                </List>
                <p>Deposit money</p>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="standard-amount-input"
                        label="Amount"
                        type="number"
                        name="amount"
                        // autoComplete="current-email"
                        margin="normal"
                        onChange={this.handleInputChange}
                        fullWidth={false}
                        value={this.state.amount}
                    />
                    <Divider />
                    <Button type="submit" variant="contained" color="primary">
                      Deposit
                    </Button>
                </form>
            </main>
        );
    }
}

export default Items;
