import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Profile from '../component/profile/Profile';
import ListUsers from '../component/users/ListUsers';
import { getListOfUsers } from '../redux/actions/dataAction';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

class Home extends Component {
    componentDidMount(){
        this.props.getListOfUsers();
    }
    render(){
			const { users, loading } = this.props.data;
			let userList = !loading ? ( <ListUsers users={users} />
			) : (<p>splash..plash...plash </p>)
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {userList}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
            
        );
    }
}

Home.propTypes = {
  getListOfUsers: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data,
	authenticated: state.user.authenticated,
})

export default connect(mapStateToProps, {getListOfUsers})(Home);