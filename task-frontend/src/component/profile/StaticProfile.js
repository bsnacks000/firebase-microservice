import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import MyButton from '../../utils/MyButton';

import {Link as MuiLink} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CalendarToday from '@material-ui/icons/CalendarToday';

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
    },

  });


const StaticProfile = (props) => {
    const { classes, profile: { Id, username, createdAt, bio, imageUrl } } = props;
    return (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
					<div className="image-wrapper">
						<img src={imageUrl} alt="profile"/>
					</div>
					<hr/>
					<div className="profile-details">
						<MuiLink component={Link} to={`/users/${username}`} color="primary" variant="h5">
							@{username}
						</MuiLink>
						<hr/>
						{bio && <Typography variant="body2">{bio}</Typography>}
              			<hr />
						<CalendarToday color="primary" />{' '}
              			<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
					</div>
                </div>
            </Paper>
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);
