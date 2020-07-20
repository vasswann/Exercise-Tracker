import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './LandingPageStyles';
import Login from '../forms/Login';
import Register from '../forms/Register';
import About from '../pages/About';
import Landing from '../pages/Landing';
import { Route, Switch } from 'react-router-dom';

const LandingPage = ({ classes }) => {
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid sm={12} md={7} className={classes.image} item={true}>
        <Typography
          component='h1'
          variant='h2'
          align='center'
          className={classes.typography}
        >
          <span className={classes.underLine}>Ex</span>ercises Tracker
        </Typography>
      </Grid>
      <Grid
        item
        sm={12}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.rightSide}
      >
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/about' component={About} />
        </Switch>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(LandingPage);
