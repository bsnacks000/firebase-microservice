import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MyButton from '../../utils/MyButton';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { createUser, clearErrors } from '../../redux/actions/dataAction';
import { DialogContent } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative',
        float: 'right',
        margin: '10px'
    },
    progressSpinner:{
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '2%'
    }

})

class CreateUser extends Component {
    state = {
        open: false,
        email: '',
        displayName: '',
        role: '',
        password: '',
        confirmPassword: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.ui.errors){
            this.setState({
                errors: nextProps.ui.errors
            })
        }
        if (!nextProps.ui.errors && !nextProps.ui.loading){
            this.setState({
                email: '',
                displayName: '',
                role: '',
                password: '',
                confirmPassword: '',
                open: false,
                errors: {}
            })
        }
    }
    
    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({
            open: false, errors: {}
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

		handleSubmit = (event) => {
			event.preventDefault();
			
			const newUserData = {
					email: this.state.email,
					displayName: this.state.displayName,
					password: this.state.password,
					confirmPassword: this.state.confirmPassword,
					role: this.state.role}
			
			this.props.createUser(newUserData);

	}

    render() {
        const { errors } = this.state;
        const { ui: {loading} , classes} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="create a new user">
                    <AddIcon />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth="true" maxWidth="sm">
                    <MyButton tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>
                        Create A New User
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                        <TextField noValidate id="email" name="email" type="email" label="Email" 
                        className={classes.textField} value={this.state.email} 
                        onChange={this.handleChange} 
                        helperText={errors.email}
                        error={errors.email ? true:false}
                        fullWidth="true"/>
                        <TextField
                        id="displayName"
                        name="displayName"
                        type="text"
                        label="Display Name"
                        className={classes.textField}
                        helperText={errors.displayName}
                        error={errors.displayName ? true : false}
                        value={this.state.displayName}
                        onChange={this.handleChange}
                        fullWidth="true"
                        />
                        <TextField
                        id="role"
                        name="role"
                        type="text"
                        label="Role"
                        className={classes.textField}
                        helperText={errors.role}
                        error={errors.role ? true : false}
                        value={this.state.role}
                        onChange={this.handleChange}
                        fullWidth="true"
                        />
                        <TextField id="password" name="password" type="password" label="Password" 
                        className={classes.textField} value={this.state.password} 
                        onChange={this.handleChange} 
                        helperText={errors.password}
                        error={errors.password ? true:false}
                        fullWidth="true"/>
                        <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        className={classes.textField}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        fullWidth="true"
                        />
                        
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                            <Button type="sumbit" variant="contained" color="primary" 
                                className={classes.submitButton} disabled={loading}>
                                    Submit
                                    {loading && (
                                        <CircularProgress size={30} className={classes.progressSpinner}></CircularProgress>
                                    )}
                                </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

CreateUser.propTypes = {
	createUser: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ui: state.ui
})

export default connect(mapStateToProps, { createUser, clearErrors })(withStyles(styles)(CreateUser))