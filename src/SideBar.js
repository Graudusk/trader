import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import StorageIcon from '@material-ui/icons/Storage';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import md5 from './md5.js';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    img: {
        width: '100%',
        height: '200px'
    }
};

class SideBar extends React.Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };


    doLogout = () => {
        console.log("logout")
        window.localStorage.clear();
        window.location = "/";
    }

    get_gravatar = (s = 25) => {
        let url;
        let email = localStorage.getItem("email") ? localStorage.getItem("email") : 'null';
        let usermail = email;

        url = 'https://www.gravatar.com/avatar/';
        url += md5.md5(usermail);
        url += "?s=" + s + "&d=identicon&r=g";

        return url;
    }

    render() {
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : null
        const email = localStorage.getItem("email") ? localStorage.getItem("email") : 'null';
        const { classes } = this.props;
        let user;

        if (token === null) {

            user = <ListItem button component={Link} key="login"  to="/login">
                        <ListItemIcon><LockIcon /></ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
        } else {

            user = <ListItem button component={Link} key="logout" onClick={this.doLogout}>
                        <ListItemIcon><LockOpenIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
        }
        const sideList = (
            <div className={classes.list}>
                {token !== null && (
                <List>
                    <ListItem key="logout">
                        <ListItemIcon><PersonOutlineIcon /></ListItemIcon>
                        <ListItemText primary={email} />
                    </ListItem>
                </List>
                <Divider />
                )}
                <List>
                    <ListItem button component={Link} key="home" to="/">
                      <ListItemIcon><HomeIcon /></ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItem>
                    {token !== null && (
                      <ListItem button component={Link} key="items" to="/items">
                        <ListItemIcon><StorageIcon /></ListItemIcon>
                        <ListItemText primary="Items" />
                      </ListItem>
                    )}
                    {token !== null && (
                    <ListItem button component={Link} key="stockpile" to="/stockpile">
                      <ListItemIcon><StorageIcon /></ListItemIcon>
                      <ListItemText primary="Stockpile" />
                    </ListItem>
                    )}
                </List>
                <Divider />
                <List>
                    {user}
                </List>
            </div>
        );

        return (
            <div>
                <IconButton
                    onClick={this.toggleDrawer('left', true)}
                    color="inherit"
                    aria-label="Menu"
                >
                    <MenuIcon />
                </IconButton>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    {token !== null && (
                        <img alt="gravatar" className={classes.img} src={this.get_gravatar("500")} />
                    )}
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);
