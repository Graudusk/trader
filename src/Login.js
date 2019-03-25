import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonAppBar from './ButtonAppBar.js';
const url = window.location.hostname === 'localhost' ? "http://localhost:1338/" : "https://trader-api.graudusk.me/";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let that = this;
        let userData = {
            email: that.state.email,
            password: that.state.password
        };

        // console.log('A name was submitted: ' + this.state.email);
        this.errors = null;
        if (event) {
            // let formData = new FormData(this.el);
            // console.log(userData);
            fetch(url + "login", {
            // fetch('https://trader-api.graudusk.me/login', {
                    // fetch('http://localhost:1337/login', {
                    headers: {
                        'Content-Type': 'application/json'
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
                    if (result.errors === undefined) {

                        localStorage.setItem('token', result.data.token);
                        localStorage.setItem('email', result.data.user.email);
                        localStorage.setItem('user', result.data.user.id);
                        window.location = "/";
                    } else {
                        that.setState({
                            error: result.errors.detail
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                });
            event.preventDefault();
        }
    }

    // componentDidMount() {
    //     let that = this;
    // }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
      <div>
            <ButtonAppBar site="Login" />
                {this.state.error !== '' && (
                    <div class="errorMsg">
                        <p>Error:</p>
                        <p>{this.state.error}</p>
                    </div>
                )}
            <main>
            <form onSubmit={this.handleSubmit}>
                <TextField
                    id="standard-email-input"
                    label="Email"
                    type="email"
                    name="email"
                    margin="normal"
                    onChange={this.handleInputChange}
                    fullWidth={true}
                    value={this.state.email}
                />

                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    margin="normal"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                    fullWidth={true}
                />
                <br />
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
            </form>
        </main>
        </div>


        );
    }
}

export default Login;
