import React, { useContext, useState, Fragment } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import styles from './FormDialogStyle';
import PostContext from '../../context/post/postContext';
import { useSnackbar } from 'notistack';

const FormDialog = ({ dialProps, classes }) => {
  const { handleDialClose, openDial, dialog, handleClose } = dialProps;
  const { icon, name, operation } = dialog;
  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = useState({});

  const postContext = useContext(PostContext);

  const { addPost } = postContext;

  let field = {};
  if (operation === 'cycling' || operation === 'runing') {
    field.name = operation;
    field.textInput = 'Duration in min';
    field.textInputName = 'duration';
    field.textInput2 = 'Distance in km';
    field.textInputName2 = 'distance';
    field.textField = true;
  } else if (
    operation === 'pushup' ||
    operation === 'pullup' ||
    operation === 'squat'
  ) {
    field.name = operation;
    field.textInput3 = 'How many reps';
    field.textInputName3 = 'reps';
  } else if (operation === 'plank') {
    field.name = operation;
    field.textInput3 = 'Duration in min';
    field.textInputName3 = 'duration';
  }

  const handleChange = (e) => {
    setValue({
      ...value,
      name: field.name,
      [e.target.name]: e.target.value,
      mydate: new Date().toDateString(),
    });
  };
  const reset = () => {
    setValue({});
  };

  const updateValueState = () => {
    if (operation === 'cycling' || operation === 'runing') {
      setValue({ [field.textInputName]: '', [field.textInputName2]: '' });
    } else {
      setValue({ [field.textInputName3]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    //check if empty the field empty the field
    if (value.duration === '' || value.distance === '' || value.reps === '') {
      enqueueSnackbar('Did you forget something? The form is empty! 😢', {
        variant: 'error',
      });
    } else {
      // save to data base and reset
      addPost(value);
      reset();
      handleDialClose();
      enqueueSnackbar('Your exercise is SAVED 🙂 !!!', {
        variant: 'success',
      });
    }
  };

  const twoField = (
    <Fragment>
      <TextField
        autoFocus
        margin='dense'
        name={field.textInputName}
        // id={field.name}
        label={field.textInput}
        type='number'
        fullWidth
        value={value.textInput}
        onChange={handleChange}
      />
      <TextField
        margin='dense'
        name={field.textInputName2}
        // id={field.name}
        label={field.textInput2}
        type='number'
        fullWidth
        value={value.textInput2}
        onChange={handleChange}
      />
    </Fragment>
  );
  const oneField = (
    <Fragment>
      <TextField
        autoFocus
        margin='dense'
        name={field.textInputName3}
        // id={field.name}
        label={field.textInput3}
        type='number'
        fullWidth
        value={value.textInputName3}
        onChange={handleChange}
      />
    </Fragment>
  );

  return (
    <Fragment>
      <div className={classes.paper}>
        <Dialog
          open={openDial}
          onEnter={updateValueState}
          onClose={handleDialClose}
          onExited={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle
            id='form-dialog-title'
            className={classes.marginAutoItem}
          >
            <Avatar className={classes.avatar}>{icon}</Avatar>
            {name}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <DialogContentText>
                Please add your exercise final distance, time or reps
              </DialogContentText>

              {field.textField ? twoField : oneField}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialClose} color={'primary'} fullWidth>
                Cancel
              </Button>
              <Button type='submit' fullWidth color={'primary'}>
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(FormDialog);
