import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './LandingStyle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Landing = ({ classes }) => {
  return (
    <Fragment>
      <Box className={classes.container}>
        <Box className={classes.upperBox}></Box>
        <Box className={classes.lowerBox}></Box>
        <Typography className={classes.item}>Train</Typography>
        <Typography className={`${classes.item} ${classes.lowerItem}`}>
          Track
        </Typography>

        <Button
          className={classes.button}
          variant='contained'
          component={Link}
          to='/login'
          color='primary'
          size='large'
        >
          Get Started
        </Button>
      </Box>
    </Fragment>
  );
};

export default withStyles(styles)(Landing);
