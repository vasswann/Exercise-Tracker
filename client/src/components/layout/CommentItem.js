import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: theme.spacing(1.5),
      padding: theme.spacing(1.5),
    },
  },
  box: {
    display: 'flex',
  },
  width: {
    width: '100%',
  },
  delete: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonCardDelete: {
    marginLeft: '8px',
    '&:hover': {
      color: '#ff0000',
      backgroundColor: 'rgba(255,0,0,.1)',
    },
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const CommentItem = ({ comment, authuser, deleteComment }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { text, name, avatar, date, user, _id } = comment;

  return (
    <Fragment>
      <div className={classes.root}>
        <Paper elevation={4} className={classes.box}>
          <Box mr={2}>
            <Avatar
              alt='Comment avatar'
              src={avatar}
              className={classes.large}
            />
          </Box>
          <Box className={classes.width}>
            <Typography color='primary'> {name}</Typography>
            <Typography> " {text} "</Typography>
            <Box className={classes.delete}>
              <Typography color='textSecondary'>
                Posted on:{' '}
                <Moment format='dddd DD MM YYYY HH:mm '>{date}</Moment>
              </Typography>
              {authuser._id === user && (
                <Button
                  className={classes.buttonCardDelete}
                  onClick={() => {
                    deleteComment(_id);
                    enqueueSnackbar('Your Comment is Deleted !!!', {
                      variant: 'success',
                    });
                  }}
                >
                  Delete
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </div>
    </Fragment>
  );
};

export default CommentItem;
