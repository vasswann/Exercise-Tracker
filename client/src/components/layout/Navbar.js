import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './NavbarStyle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TimelineIcon from '@material-ui/icons/Timeline';
import { NavLink, Link } from 'react-router-dom';
import themeContext from '../../context/theme/themeContext';
import Alerts from './Alerts';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';

const Navbar = (props) => {
  const { title, classes } = props;

  const ThemeContext = useContext(themeContext);
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearPosts } = postContext;

  const { changeMode, isDarkMode } = ThemeContext;
  const check = isDarkMode;

  const handleChange = (e) => {
    changeMode();
  };

  const onLogout = (e) => {
    logout();
    clearPosts();
  };

  const authLinks = (
    <Fragment>
      <Button
        color='inherit'
        to='/dashboard/graph'
        component={NavLink}
        activeStyle={{
          color: 'orange',
        }}
      >
        <TimelineIcon />
        Graph
      </Button>
      <Typography>| Hello, {user && user.name.split(' ')[0]} </Typography>
      <Avatar alt={user && user.name} src={user && user.avatar} />

      <Button color='inherit' to='/' component={Link} onClick={onLogout}>
        <ExitToAppIcon />
        Logout
      </Button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Button
        color='inherit'
        to='/login'
        component={NavLink}
        activeStyle={{
          color: 'orange',
        }}
      >
        Log In
      </Button>
      <Button
        color='inherit'
        to='/register'
        component={NavLink}
        activeStyle={{
          color: 'orange',
        }}
      >
        Register
      </Button>
      <Button
        color='inherit'
        to='/about'
        component={NavLink}
        activeStyle={{
          color: 'orange',
        }}
      >
        About
      </Button>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.navBar}>
        <CssBaseline />
        <Container>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              component={Link}
              to={isAuthenticated ? '/dashboard' : '/'}
            >
              <EqualizerIcon color='primary' />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {title}
            </Typography>

            {isAuthenticated ? authLinks : guestLinks}

            <Switch
              checked={check}
              onChange={handleChange}
              color='primary'
              name='checkedB'
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography>{isDarkMode ? 'Dark' : 'Light'}</Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Alerts />
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Exercises Tracker',
};

export default withStyles(styles)(Navbar);
