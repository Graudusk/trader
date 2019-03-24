import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SimpleMenu from './SimpleMenu.js';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function ButtonAppBar(props) {
    function doLogout() {
        console.log("logout")
        window.localStorage.clear();
        window.location = "/";
    }

    // const email = localStorage.getItem("email") ? localStorage.getItem("email") : null
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null
    const { classes } = props;
    // let loginBtn = <Link to="/login">Login</Link>;
    // let logoutBtn = <Link to="#" onClick={this.doLogout}>Logout</Link>;
    // let btn = token == null ? <Button href="/login" color="inherit">Login</Button> : <Button onClick={doLogout} color="inherit">Logout</Button>;
    let user = null;
    if (token === null) {
        user = <Button href="/login" color="inherit">Login</Button>;
    } else {
        user = <div>
              <IconButton href="/user" className={classes.menuButton} color="inherit" aria-label="Menu">
                <AccountCircleIcon />
              </IconButton>
              <Button onClick={doLogout} color="inherit">Logout</Button>
            </div>;
    }
    return (
        <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <SimpleMenu/>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {props.site}
          </Typography>
          {user}
          {/*<Button href="/login" color="inherit">Login</Button>*/}
        </Toolbar>
      </AppBar>
    </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
