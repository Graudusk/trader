import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Home from './Home.js';
import Login from './Login.js';
import Items from './Items.js';
import User from './User.js';
import Stockpile from './Stockpile.js';
import ItemDetails from './ItemDetails.js';
import Sell from './Sell.js';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            token: ''
        };
    }

    componentDidMount() {
        // this.setState({
        //     ["token"]: localStorage.getItem("token") ? localStorage.getItem("token") : null,
        //     ["email"]: localStorage.getItem("email") ? localStorage.getItem("email") : null
        // });
    }

    doLogout() {
        window.localStorage.clear();
        window.location = "/";
    }

    render() {
        return (
            <Router>
        <div className="App">
          {/*<nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {this.state.token === null && (
                <li>{loginBtn}</li>
                )}
                {this.state.email !== null && (
                    <li><Link to="/user">{this.state.email}</Link></li>
                )}
                {this.state.token !== null && (
                <li><Link to="/items">Items</Link></li>
                )}
                {this.state.token !== null && (
                <li><Link to="/stockpile">Stockpile</Link></li>
                )}
                {this.state.token !== null && (
                <li>{logoutBtn}</li>
                )}
            </ul>
          </nav>*/}
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/items" component={Items} />
          <Route path="/user" component={User} />
          <Route path="/stockpile" component={Stockpile} />
          <Route path="/item/details/:id" component={ItemDetails} />
          <Route path="/item/sell/:id" component={Sell} />
        </div>
      </Router>

        );
    }
}

export default App;
