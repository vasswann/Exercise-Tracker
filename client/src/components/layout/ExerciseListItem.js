import React, { Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import PostContext from '../../context/post/postContext';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',

    '&:hover': {
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[700],
    },
  },
  buttonCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCardDelete: {
    marginLeft: '8px',
    '&:hover': {
      color: '#ff0000',
      backgroundColor: 'rgba(255,0,0,.1)',
    },
  },
  buttonCardEdit: {
    '&:hover': {
      color: '#64dd17',
      backgroundColor: 'rgba(100,221,23,.1)',
    },
  },
  title: {
    fontSize: 14,
  },
  cardMarginBottom: {
    marginBottom: '11px',
  },
  current: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.primary.main,
  },
}));

const ExerciseListItem = ({ post }) => {
  const classes = useStyles();
  const { _id, name, mydate } = post;
  const postContext = useContext(PostContext);
  const { deletePost, setCurrent, clearCurrent } = postContext;
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };
  const onDelete = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    deletePost(_id);
    clearCurrent();
    setOpen(false);
    enqueueSnackbar('Your exercise got delted! 😢', {
      variant: 'error',
    });
  };
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Are you sure you want to delete? {name}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} fullWidth color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} fullWidth color='primary' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            You done :{' '}
            <Box component='span'>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Box>
          </Typography>

          <Typography variant='body2' component='p'>
            {post.reps && `Reps : ${post.reps}`}{' '}
            {post.duration && `Duration :  ${post.duration}/min`}{' '}
            {post.distance && `| Distance : ${post.distance}/km`}
          </Typography>
          <Typography color='textSecondary'>{mydate}</Typography>
        </CardContent>
        <CardActions className={classes.buttonCard}>
          <IconButton
            aria-label='delete'
            className={classes.buttonCardDelete}
            onClick={onDelete}
          >
            <DeleteForeverIcon />
          </IconButton>
          <IconButton
            aria-label='edit'
            className={classes.buttonCardEdit}
            onClick={() => setCurrent(post)}
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Divider light />
    </Fragment>
  );
};

export default ExerciseListItem;
