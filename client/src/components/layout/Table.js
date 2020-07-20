import React, { Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tableShadow: {
    boxShadow: '0px 2px 8px 0px rgba(0,0,0,.5)',
    marginBottom: '10px',
  },
}));

const TableComponent = ({ posts }) => {
  const classes = useStyles();
  const cycling = posts.filter((post) => post.name === 'cycling');
  let cyclingMaxDistance;
  let cyclingMaxDuration;
  if (cycling.length !== 0) {
    const cyclingArrDistance = cycling.map((post) => post.distance);
    const cyclingArrDuration = cycling.map((post) => post.duration);
    cyclingMaxDistance = Math.max(...cyclingArrDistance);
    cyclingMaxDuration = Math.max(...cyclingArrDuration);
  } else {
    cyclingMaxDistance = 0;
    cyclingMaxDuration = 0;
  }

  const runing = posts.filter((post) => post.name === 'runing');
  let runingMaxDistance;
  let runingMaxDuration;
  if (runing.length !== 0) {
    const runingArrDistance = runing.map((post) => post.distance);
    const runingArrDuration = runing.map((post) => post.duration);
    runingMaxDistance = Math.max(...runingArrDistance);
    runingMaxDuration = Math.max(...runingArrDuration);
  } else {
    runingMaxDistance = 0;
    runingMaxDuration = 0;
  }

  const pullup = posts.filter((post) => post.name === 'pullup');
  let pullupMaxReps;
  if (pullup.length !== 0) {
    const pullupArrReps = pullup.map((post) => post.reps);
    pullupMaxReps = Math.max(...pullupArrReps);
  } else {
    pullupMaxReps = 0;
  }

  const pushup = posts.filter((post) => post.name === 'pushup');
  let pushupMaxReps;
  if (pushup.length !== 0) {
    const pushupArrReps = pushup.map((post) => post.reps);
    pushupMaxReps = Math.max(...pushupArrReps);
  } else {
    pushupMaxReps = 0;
  }

  const squat = posts.filter((post) => post.name === 'squat');
  let squatMaxReps;
  if (squat.length !== 0) {
    const squatArrReps = squat.map((post) => post.reps);
    squatMaxReps = Math.max(...squatArrReps);
  } else {
    squatMaxReps = 0;
  }

  const plank = posts.filter((post) => post.name === 'plank');
  let plankMaxReps;
  if (plank.length !== 0) {
    const plankArrReps = plank.map((post) => post.duration);
    plankMaxReps = Math.max(...plankArrReps);
  } else {
    plankMaxReps = 0;
  }

  function createData(name, cycling, runing, pullup, pushup, squat, plank) {
    return { name, cycling, runing, pullup, pushup, squat, plank };
  }

  const rows = [
    createData(
      'Duration:',
      `${cyclingMaxDuration}/min`,
      `${runingMaxDuration}/min`,
      '-',
      '-',
      '-',
      `${plankMaxReps}/min`
    ),
    createData(
      'Distance:',
      `${cyclingMaxDistance}/km`,
      `${runingMaxDistance}/km`,
      '-',
      '-',
      '-',
      '-'
    ),
    createData(
      'Reps:',
      '-',
      '-',
      pullupMaxReps,
      pushupMaxReps,
      squatMaxReps,
      '-'
    ),
  ];

  return (
    <Fragment>
      <TableContainer component={Paper} className={classes.tableShadow}>
        <Table aria-label='caption table'>
          <caption>
            Your best result in longest time, longest distance and the most
            reps. Ever you done
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>Exercises</TableCell>
              <TableCell align='right'>Cycling</TableCell>
              <TableCell align='right'>Runing</TableCell>
              <TableCell align='right'>Pull Up</TableCell>
              <TableCell align='right'>Push UP</TableCell>
              <TableCell align='right'>Squat</TableCell>
              <TableCell align='right'>Plank</TableCell>
              {/* <TableCell align='right'>Reps&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.cycling}</TableCell>
                <TableCell align='right'>{row.runing}</TableCell>
                <TableCell align='right'>{row.pullup}</TableCell>
                <TableCell align='right'>{row.pushup}</TableCell>
                <TableCell align='right'>{row.squat}</TableCell>
                <TableCell align='right'>{row.plank}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TableComponent;
