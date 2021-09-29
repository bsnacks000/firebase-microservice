import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


//redux
import { connect } from 'react-redux';
import { addUserDetail } from '../redux/actions/userAction';

const styles = (theme) => ({
    ...theme.spreadThis
})


class UserDetail extends Component {

    constructor(){
        super();
        this.state = {
            username: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.ui.errors)
            this.setState({ errors: nextProps.ui.errors });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const userDetail = { user: {
            username: this.state.username}}

        this.props.addUserDetail(userDetail, this.props.history);
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render(){
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return(
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography varian="h2" className={classes.pageTitle}>
                        User Info
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <TextField id="username" name="username" type="text" label="Username" 
                        className={classes.textField} value={this.state.username} 
                        onChange={this.handleChange} 
                        helperText={errors.username}
                        error={errors.username ? true:false}
                        fullWidth="true"/>
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Finish setting up account
                            {loading && (
                                <CircularProgress className={classes.spinner} size={30}/>
                            )}
                        </Button>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

UserDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    addUserDetail: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
} 

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
})

const mapActionsToProps = {
    addUserDetail
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(UserDetail));