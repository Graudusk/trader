import React from 'react';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null

    return (
      <div>

          <IconButton
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
              color="inherit"
              aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        {/*<Button
        >
          Open Menu
        </Button>*/}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}><Link to="/">Home</Link></MenuItem>
          {token !== null && (
          <MenuItem onClick={this.handleClose}><Link to="/items">Items</Link></MenuItem>
          )}
          {token !== null && (
            <MenuItem onClick={this.handleClose}><Link to="/stockpile">Stockpile</Link></MenuItem>
          )}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
