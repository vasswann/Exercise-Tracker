import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './LoginStyles';
import Grid from '@material-ui/core/Grid';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const Login = (props) => {
  const { classes } = props;

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }
    if (error) {
      error.errors.map((err) => {
        console.log(err);
        setAlert(err.msg, 'error');
        clearErrors();
        return error;
      });
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <div className={classes.paper}>
      <Avatar color='primary' className={classes.avatar}>
        <BorderColorIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
          // validators={['required', 'isEmail']}
          // errorMessages={['this field is required', 'email is not valid']}
          autoComplete='email'
          autoFocus
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
          // validators={['required', 'isLength']}
          // errorMessages={[
          //   'this field is required',
          //   'password must be minimum 6 character',
          // ]}
          autoComplete='current-password'
        />

        <Button
          type='submit'
          fullWidth
          variant='contained'
          color={'primary'}
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Typography>
              Don't have an account?
              <Button color='primary' to='/register' component={Link}>
                Register
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default withStyles(styles)(Login);
