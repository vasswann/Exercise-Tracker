import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './LoginStyles';
import Grid from '@material-ui/core/Grid';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const { classes } = props;

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }

    if (error) {
      error.errors.map((err) => {
        setAlert(err.msg, 'error');
        clearErrors();
        return err;
      });
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields ', 'error');
    } else if (password !== password2) {
      setAlert('Password do not match ', 'error');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className={classes.paper}>
      <Avatar color='primary' className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Register
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='name'
          label='Name'
          name='name'
          value={name}
          onChange={handleChange}
          autoComplete='name'
          autoFocus
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          value={email}
          onChange={handleChange}
          type='email'
          autoComplete='email'
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password2'
          value={password2}
          onChange={handleChange}
          label='Confirm Password'
          type='password'
          id='password2'
          autoComplete='current-password'
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color={'primary'}
          className={classes.submit}
        >
          Register
        </Button>
        <Grid container>
          <Grid item>
            <Typography>
              Have an account?
              <Button color='primary' to='/login' component={Link}>
                Log In
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default withStyles(styles)(Register);
