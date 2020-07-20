import React, { useContext, useState, Fragment, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import PostContext from '../../context/post/postContext';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';

const UpdateForm = () => {
  const postContext = useContext(PostContext);
  const { enqueueSnackbar } = useSnackbar();
  const { current, clearCurrent, updatePost } = postContext;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});

  useEffect(() => {
    if (current !== null) {
      setOpen(true);
      setValue(current);
    }
  }, [postContext, current]);

  const handleClose = () => {
    setOpen(false);
    clearCurrent();
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.duration === '' || value.distance === '' || value.reps === '') {
      enqueueSnackbar('Did you forget something? The form is empty! 😢', {
        variant: 'error',
      });
    } else {
      updatePost(value);
      setOpen(false);
      clearCurrent();
      enqueueSnackbar('You exercise is updated and saved! ❤️', {
        variant: 'success',
      });
    }
  };

  let textField = null;

  if (value.name === 'cycling' || value.name === 'runing') {
    textField = true;
  }

  const twoField = (
    <Fragment>
      <TextField
        autoFocus
        margin='dense'
        name='duration'
        label='Duration in min'
        type='number'
        fullWidth
        value={value.duration}
        onChange={handleChange}
      />
      <TextField
        margin='dense'
        name='distance'
        label='Distance in km'
        type='number'
        fullWidth
        value={value.distance}
        onChange={handleChange}
      />
    </Fragment>
  );
  const oneField = (
    <Fragment>
      <TextField
        autoFocus
        margin='dense'
        name='reps'
        label='How many reps'
        type='number'
        fullWidth
        value={value.reps}
        onChange={handleChange}
      />
    </Fragment>
  );

  return (
    <Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Updateing / {value.mydate} / Training day
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please update your exercise final distance, time or reps
            </DialogContentText>
            {value.name === 'cycling' || value.name === 'runing'
              ? twoField
              : oneField}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} fullWidth color='primary'>
              Cancel
            </Button>
            <Button type='submit' fullWidth color='primary'>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
};

export default UpdateForm;
