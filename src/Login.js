import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

        console.log('A name was submitted: ' + this.state.email);
        this.errors = null;
        if (event) {
            // let formData = new FormData(this.el);
            // console.log(userData);
            fetch("http://localhost:1338/login", {
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
                    // this.setState({
                    //     [email]: result.data.user.email,
                    //     [token]: result.data.user.token
                    // });
                    console.log(result)
                    localStorage.setItem('token', result.data.token);
                    localStorage.setItem('email', result.data.user.email);
                    localStorage.setItem('user', result.data.user.id);
                    // router.go('/');
                    // if (result.status == 200) {
                    // that.$router.push('/');
                    window.location = "/";

                    // that.props.history.push('/');
                    // that.forceUpdate()
                    // }
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
            <main>
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit}>
                {/*<label>
                    Email:
                    <input type="email" value={this.state.email} onChange={this.handleInputChange} name="email" />
                </label>*/}


                <TextField
                    id="standard-email-input"
                    label="Email"
                    type="email"
                    name="email"
                    // autoComplete="current-email"
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
                    // autoComplete="current-password"
                    margin="normal"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                    fullWidth={true}
                />
                {/*<label>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" />
                </label>*/}
                <br />
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
                {/*<input type="submit" value="Submit" />*/}
            </form>
        </main>


        );
    }
}

export default Login;
