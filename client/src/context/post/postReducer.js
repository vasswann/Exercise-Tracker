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

export default (state, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        posts: [],
        error: [],
        current: null,
        selected: null,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case SET_SELECTED:
      return {
        ...state,
        selected: true,
      };
    case CLEAR_SELECTED:
      return {
        ...state,
        selected: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
