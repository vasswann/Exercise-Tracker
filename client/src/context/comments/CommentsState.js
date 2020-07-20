import React, { useReducer } from 'react';
import axios from 'axios';
import CommentsContext from './commentsContext';
import commentsReducer from './commentsReducer';

import {
  ADD_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
  COMMENT_LOADING,
  COMMENTS_ERROR,
} from '../types';

const CommentsState = (props) => {
  const initialState = {
    comments: null,
    error: [],
    loading: false,
  };

  // set loading
  const setLoading = () => {
    dispatch({ type: COMMENT_LOADING });
  };

  //get comments
  const getComments = async () => {
    try {
      setLoading();
      const res = await axios.get('/api/comments');

      dispatch({
        type: GET_COMMENTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: COMMENTS_ERROR,
        payload: error.msg,
      });
    }
  };

  // add comment
  const addComment = async (comment) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      setLoading();
      const res = await axios.post('/api/comments', comment, config);
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: COMMENTS_ERROR,
        payload: error.msg,
      });
    }
  };

  //delete comment
  const deleteComment = async (id) => {
    try {
      setLoading();
      await axios.delete(`/api/comments/${id}`);

      dispatch({
        type: DELETE_COMMENT,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: COMMENTS_ERROR,
        payload: error.msg,
      });
    }
  };

  const [state, dispatch] = useReducer(commentsReducer, initialState);

  return (
    <CommentsContext.Provider
      value={{
        comments: state.comments,
        error: state.error,
        loading: state.loading,
        getComments,
        addComment,
        deleteComment,
      }}
    >
      {props.children}
    </CommentsContext.Provider>
  );
};

export default CommentsState;
