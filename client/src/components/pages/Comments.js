import React, { Fragment, useState, useEffect, useContext } from 'react';
import CommentsContext from '../../context/comments/commentsContext';
import AuthContext from '../../context/auth/authContext';
import CommentItem from '../layout/CommentItem';
import Container from '@material-ui/core/Container';
import ButtonBack from '../layout/button/ButtonBack';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';

const Comments = () => {
  const [value, setValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const commentsContext = useContext(CommentsContext);
  const authContext = useContext(AuthContext);
  const {
    comments,
    getComments,
    loading,
    addComment,
    deleteComment,
  } = commentsContext;
  const { user } = authContext;

  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === '') {
      enqueueSnackbar('Did you forget something? The form is empty! 😢', {
        variant: 'error',
      });
    } else {
      addComment({ text: value });
      setValue('');
      enqueueSnackbar('Your Comment is posted 🙂 Thank you!!!', {
        variant: 'success',
      });
    }
  };
  return (
    <Fragment>
      <Container>
        <Box height='250px'>
          <ButtonBack />
          <Typography variant='h6' component='h1' align='center'>
            COMMENTS
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth variant='filled'>
              <InputLabel htmlFor='filled-adornment-amount'>
                Write a comment
              </InputLabel>
              <FilledInput
                id='filled-adornment-amount'
                autoFocus={true}
                multiline={true}
                rowsMax='5'
                value={value}
                onChange={handleChange}
                // startAdornment={<InputAdornment position='start'>$</InputAdornment>}
              />
            </FormControl>
            <Button type='submit' color='primary' fullWidth>
              Add
            </Button>
          </form>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            {comments !== null &&
              comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  authuser={user}
                  deleteComment={deleteComment}
                />
              ))}
          </Box>
        )}
      </Container>
    </Fragment>
  );
};

export default Comments;
