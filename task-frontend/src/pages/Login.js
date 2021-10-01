import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userAction';

const styles = (theme) => ({
    ...theme.spreadThis
})


class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.ui.errors)
            this.setState({ errors: nextProps.ui.errors });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password}
        this.props.loginUser(userData, this.props.history);

    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render(){
        const { classes, ui: { loading } } = this.props;
        const { errors } = this.state;
        return(
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography varian="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <TextField noValidate id="email" name="email" type="email" label="Email" 
                        className={classes.textField} value={this.state.email} 
                        onChange={this.handleChange} 
                        helperText={errors.email}
                        error={errors.email ? true:false}
                        fullWidth="true"/>
                        <TextField id="password" name="password" type="password" label="Password" 
                        className={classes.textField} value={this.state.password} 
                        onChange={this.handleChange} 
                        helperText={errors.password}
                        error={errors.password ? true:false}
                        fullWidth="true"/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Login
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

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
} 

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));