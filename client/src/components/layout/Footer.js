import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './FooterStyle';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AuthContext from '../../context/auth/authContext';

const Footer = ({ classes }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  return (
    <Box className={classes.footerBox}>
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © Cycling Tracker. Created '}
        <Link
          href='https://istvanvas.com'
          color='primary'
          rel='noopener'
          target='_blank'
        >
          Istvan Vas
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      {isAuthenticated && (
        <Button
          color='inherit'
          to='/dashboard/comments'
          component={NavLink}
          activeStyle={{
            color: 'orange',
          }}
        >
          Comments
        </Button>
      )}
    </Box>
  );
};

export default withStyles(styles)(Footer);
