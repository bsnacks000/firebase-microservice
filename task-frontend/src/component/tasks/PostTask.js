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
import { postTask, clearErrors } from '../../redux/actions/dataAction';
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

class PostTask extends Component {
    state = {
        open: false,
        body: '',
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
                body: '',
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
			
			const newTaskData = {
					body: this.state.body,
					username: this.state.username}
			
			this.props.postTask(newTaskData);

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
                        <TextField noValidate id="body" name="body" type="text" label="body" 
                        className={classes.textField} value={this.state.body} 
                        onChange={this.handleChange} 
                        helperText={errors.body}
                        error={errors.body ? true:false}
                        fullWidth="true"/>
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

PostTask.propTypes = {
	postTask: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ui: state.ui
})

export default connect(mapStateToProps, { postTask, clearErrors })(withStyles(styles)(PostTask))