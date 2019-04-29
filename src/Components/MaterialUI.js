import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typed from 'react-typed';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 40,
  },
  body: {
    fontSize: 36,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 30,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

// let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
function DisconnectedRecommendation(props) {
  const { classes, recommendation } = props;

  return (
    <div>
      <Typed
        id="music-quote"
        strings={['Without music life would Bb']}
        typeSpeed={40}
      />
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell />
              <CustomTableCell align="right">Song</CustomTableCell>
              <CustomTableCell align="right">Artist</CustomTableCell>
              <CustomTableCell align="right">Album</CustomTableCell>
              {/* <CustomTableCell align="right">Protein (g)</CustomTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {recommendation.map(track => (
              <TableRow className={classes.row} key={track.name}>
                <CustomTableCell component="th" scope="row">
                  Play
                </CustomTableCell>
                <CustomTableCell align="right">{track.name}</CustomTableCell>
                <CustomTableCell align="right">
                  {track.artists[0].name}
                </CustomTableCell>
                <CustomTableCell align="right">
                  {track.album.name}
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

DisconnectedRecommendation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const StyledRecommendation = withStyles(styles)(DisconnectedRecommendation);

const mapStateToProps = state => {
  return {
    recommendation: state.recommendation,
  };
};

export default connect(
  mapStateToProps,
  null
)(StyledRecommendation);
