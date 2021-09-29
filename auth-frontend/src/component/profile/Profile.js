import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MyButton from '../../utils/MyButton';

//mui
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

//icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//redux
import {connect} from 'react-redux'
import { Typography } from '@material-ui/core';

import { logoutUser } from '../../redux/actions/userAction';

const styles = (theme) => ({
    paper: {
      paddingRight: 10,
	  paddingLeft: 10,
	  paddingBottom: 50,
	  paddingTop: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },



    buttons: {
		textAlign: 'center',
		'& a': {
		margin: '20px 10px'
		},

    },
	button: {
        float: 'right'
      }

  });

class Profile extends Component {

	handleLogout = () => {
		this.props.logoutUser();
	}
    render() {
        const { classes, user: { Id, displayName, role, loading, authenticated } }= this.props;
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
              <div className={classes.profile}>
					      <div className="profile-details">
                  <Typography variant="body2">Name: {displayName}</Typography>
                  <hr/>
                  <Typography variant="body2">Role: {role}</Typography>
                </div>
                <MyButton tip="Logout" onClick={this.handleLogout} btnClassName={classes.button}>
                  <ExitToAppIcon color="primary"/>
                </MyButton>
              </div>
            </Paper>
        ): (
			<Paper className={classes.paper}>
				<Typography variant="body2" align="center">
					No proifle found, please login again
				</Typography>
				<div className={classes.buttons}>
					<Button varian="contained" color="primary" component={Link} to="/login">
						Login
					</Button>
				</div>
			</Paper>
		)): (<p>loading </p>)
        return profileMarkup;
    }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = { logoutUser };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
