import React, { useContext, useEffect, Fragment } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './DashBoardStyle';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';
import ThemeContext from '../../context/theme/themeContext';
import ChartContext from '../../context/chart/chartContext';
import Container from '@material-ui/core/Container';
import GridComponent from '../pages/GridComponent';
import Graph from '../pages/Graph';
import Comments from '../pages/Comments';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Route, Switch } from 'react-router-dom';

const DashBoard = ({ classes }) => {
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);
  const themeContext = useContext(ThemeContext);
  const chartContext = useContext(ChartContext);
  const { loadUser } = authContext;
  const { getPosts, loading } = postContext;
  const { isDarkMode } = themeContext;
  const { getGoals } = chartContext;

  useEffect(() => {
    loadUser();
    getPosts();
    getGoals();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Navbar />
        {loading ? (
          <LinearProgress color='primary' />
        ) : (
          <Container>
            <Switch>
              <Route exact path='/dashboard' component={GridComponent} />
              <Route exact path='/dashboard/graph' component={Graph} />
              <Route exact path='/dashboard/comments' component={Comments} />
            </Switch>
          </Container>
        )}

        <Footer className={classes.footer} />
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(DashBoard);
