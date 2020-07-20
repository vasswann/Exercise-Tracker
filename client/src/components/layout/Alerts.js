import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import AlertContext from '../../context/alert/alertContext';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alerts = () => {
  const classes = useStyles();
  const alertContext = useContext(AlertContext);
  const { alerts, removeAlert } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className={classes.root} key={alert.id}>
        <Alert
          position='absolute'
          variant='filled'
          severity={alert.type}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                removeAlert(alert.id);
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {alert.msg}
        </Alert>
        <Divider />
      </div>
    ))
  );
};

export default Alerts;
