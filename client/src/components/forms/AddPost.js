import React, { useContext, useState, Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PostContext from '../../context/post/postContext';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddPost = ({ selectedDate }) => {
  const classes = useStyles();
  const postContext = useContext(PostContext);
  const { selected, clearSelected, addPost } = postContext;
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState({ name: 'cycling' });

  useEffect(() => {
    if (selected) {
      setOpen(true);
    }
  }, [postContext, selected]);

  const handleClose = () => {
    setOpen(false);
    clearSelected();
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
      mydate: selectedDate.date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.name === 'cycling' || value.name === 'runing') {
      if (!(value.duration && value.distance)) {
        return enqueueSnackbar(
          'Did you forget something? The form is empty! 😢',
          {
            variant: 'error',
          }
        );
      }
    }
    if (value.name === 'plank') {
      if (!value.duration) {
        return enqueueSnackbar(
          'Did you forget something? The form is empty! 😢',
          {
            variant: 'error',
          }
        );
      }
    }
    if (
      value.name === 'pushup' ||
      value.name === 'pullup' ||
      value.name === 'squat'
    ) {
      if (!value.reps) {
        return enqueueSnackbar(
          'Did you forget something? The form is empty! 😢',
          {
            variant: 'error',
          }
        );
      }
    }

    addPost(value);
    clearSelected();
    enqueueSnackbar('Your exercise is SAVED 🙂 !!!', {
      variant: 'success',
    });
  };

  let field = {};
  if (value.name === 'cycling' || value.name === 'runing') {
    field.name = value.name;
    field.textInput = 'Duration in min';
    field.textInputName = 'duration';
    field.textInput2 = 'Distance in km';
    field.textInputName2 = 'distance';
    field.textField = true;
  } else if (
    value.name === 'pushup' ||
    value.name === 'pullup' ||
    value.name === 'squat'
  ) {
    field.name = value.name;
    field.textInput3 = 'How many reps';
    field.textInputName3 = 'reps';
  } else if (value.name === 'plank') {
    field.name = value.name;
    field.textInput3 = 'Duration in min';
    field.textInputName3 = 'duration';
  }

  const twoField = (
    <Fragment>
      <TextField
        autoFocus
        margin='dense'
        name={field.textInputName}
        label={field.textInput}
        type='number'
        fullWidth
        value={value.textInput}
        onChange={handleChange}
      />
      <TextField
        margin='dense'
        name={field.textInputName2}
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
        label={field.textInput3}
        type='number'
        fullWidth
        value={value.textInputName3}
        onChange={handleChange}
      />
    </Fragment>
  );

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        // onEnter={updateValueState}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Add exercise to your missed day / {selectedDate.date}
        </DialogTitle>
        <FormControl className={classes.formControl}>
          <InputLabel id='simple-select-label'>Exercise</InputLabel>
          <Select
            labelId='simple-select-label'
            id={value.name}
            name='name'
            value={value.name}
            onChange={handleChange}
          >
            <MenuItem value='cycling'>Cycling</MenuItem>
            <MenuItem value='runing'>Runing</MenuItem>
            <MenuItem value='pushup'>Push Up</MenuItem>
            <MenuItem value='pullup'>Pull Up</MenuItem>
            <MenuItem value='squat'>Squat</MenuItem>
            <MenuItem value='plank'>Plank</MenuItem>
          </Select>
        </FormControl>
        <DialogContent>
          <DialogContentText>
            Please add your exercise final distance, time or reps
          </DialogContentText>
          {value.name === 'cycling' || value.name === 'runing'
            ? twoField
            : oneField}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button type='submit' onClick={handleSubmit} color='primary'>
            Add now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPost;
