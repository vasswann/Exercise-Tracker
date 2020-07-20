import React, { useReducer } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';
// import { v4 as uuidv4 } from 'uuid';
// uuid it was on developing purpuse only. To give domy id for my data
import {
  ADD_POST,
  POST_ERROR,
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_SELECTED,
  CLEAR_SELECTED,
  CLEAR_POST,
  SET_LOADING,
} from '../types';

const PostState = (props) => {
  const initialState = {
    posts: [],
    error: [],
    current: null,
    selected: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  // set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // add post
  const addPost = async (post) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      setLoading();
      const res = await axios.post('/api/posts', post, config);
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error.msg,
      });
    }
  };

  //get posts
  const getPosts = async () => {
    try {
      setLoading();
      const res = await axios.get('/api/posts');

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error.msg,
      });
    }
  };

  //update post
  const updatePost = async (post) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      setLoading();
      const res = await axios.put(`/api/posts/${post._id}`, post, config);
      dispatch({
        type: UPDATE_POST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error.msg,
      });
    }
  };

  // clear post state
  const clearPosts = () => {
    dispatch({ type: CLEAR_POST });
  };

  //SET current post
  const setCurrent = (post) => {
    dispatch({ type: SET_CURRENT, payload: post });
  };

  //clear current post
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // delete post
  const deletePost = async (id) => {
    try {
      setLoading();
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error.msg,
      });
    }
  };

  // set selected
  const setSelected = () => {
    dispatch({ type: SET_SELECTED });
  };

  //clear selected
  const clearSelected = () => {
    dispatch({ type: CLEAR_SELECTED });
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        error: state.error,
        current: state.current,
        selected: state.selected,
        loading: state.loading,
        addPost,
        getPosts,
        deletePost,
        setCurrent,
        clearCurrent,
        updatePost,
        setSelected,
        clearSelected,
        clearPosts,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
