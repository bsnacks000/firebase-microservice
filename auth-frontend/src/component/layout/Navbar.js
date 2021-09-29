import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MyButton from '../../utils/MyButton';
import CreateUser from '../users/CreateUser';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

//redux
import { connect } from 'react-redux';


// import SimpleMenu from './Menu';

class Navbar extends Component {

    render(){
        const { authenticated } = this.props;
        return (
        <AppBar>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                {authenticated ? (
                    <Fragment>
                        <Link to="/">
                        <MyButton tip="home">
                            <HomeIcon/>
                        </MyButton>
                        </Link>
                        <CreateUser />
                        <MyButton tip="notification">
                            <Notifications/>
                        </MyButton>
                    </Fragment>
                ): (
                    <Fragment>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                    </Fragment>
                )}
            </Toolbar>
        </AppBar>
       )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);