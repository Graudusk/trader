import React, { Component } from 'react';
import ButtonAppBar from './ButtonAppBar.js';

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
          message: "",
      };
  }

  componentDidMount() {
    let that = this;
    fetch("http://localhost:1338")
    // fetch("https://trader-api.graudusk.me")
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
        console.log(result)
        that.setState({
            message: result.description
        });
    });
  }

  render() {
    return (
      <div>
            <ButtonAppBar site="Home" />
      <main>
        {/*<h1>Home</h1>*/}
        <p>{ this.state.message }</p>
      </main>
      </div>
    );
  }
}

export default Home;
