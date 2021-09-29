import {React, Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const styles = (theme) => ({
	...theme.spreadThis,
	table: {
    minWidth: 700,
  },

})

class ListUsers extends Component {
	render (){
		const {classes, users} = this.props;
		return (
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="right">Name</StyledTableCell>
							<StyledTableCell align="right">Email</StyledTableCell>
							<StyledTableCell align="right">Role</StyledTableCell>
							<StyledTableCell align="right">Created By</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((row) => (
							<StyledTableRow key={row.Id}>
								<StyledTableCell align="right">{row.displayName}</StyledTableCell>
								<StyledTableCell align="right">{row.email}</StyledTableCell>
								<StyledTableCell align="right">{row.role}</StyledTableCell>
								<StyledTableCell align="right">{row.createdBy}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
}


ListUsers.propTypes = {
	users: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    ui: state.ui
})

export default connect(mapStateToProps, null)(withStyles(styles)(ListUsers))