import React, { Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import ExerciseListItem from './ExerciseListItem';
import UpdateForm from '../forms/UpdateForm';
import AddPost from '../forms/AddPost';
import PostContext from '../../context/post/postContext';

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

  buttonCardEdit: {
    '&:hover': {
      color: '#64dd17',
      backgroundColor: 'rgba(100,221,23,.1)',
    },
  },
  header: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const ExerciseList = ({ lastDayExecise, selectedPost, selectedDate }) => {
  const classes = useStyles();
  const postContext = useContext(PostContext);
  const { setSelected } = postContext;

  const handleAdd = () => {
    setSelected();
  };

  return (
    <Fragment>
      <Card className={classes.header}>
        <CardContent>
          <Typography>Your selected day / {selectedDate.date}</Typography>
        </CardContent>
        <CardActions className={classes.buttonCard}>
          <IconButton
            onClick={handleAdd}
            aria-label='add'
            className={classes.buttonCardEdit}
          >
            <AddIcon />
          </IconButton>
        </CardActions>
      </Card>
      <AddPost selectedDate={selectedDate} />
      <Divider />
      {selectedPost.length !== 0 ? (
        <Fragment>
          {selectedPost.map((post) => (
            <ExerciseListItem post={post} key={post._id} />
          ))}
        </Fragment>
      ) : (
        <Fragment>
          <Card className={classes.root}>
            <CardContent>
              <Typography>
                Is this your rest day? If not then push...
              </Typography>
            </CardContent>
          </Card>
        </Fragment>
      )}

      <Card className={classes.header}>
        <CardContent>
          <Typography>Last time when you trained</Typography>
        </CardContent>
      </Card>
      <Divider />

      {lastDayExecise.map((post) => (
        <ExerciseListItem post={post} key={post._id} />
      ))}
      <UpdateForm />
    </Fragment>
  );
};

export default ExerciseList;
