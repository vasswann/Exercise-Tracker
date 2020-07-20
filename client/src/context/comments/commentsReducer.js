import {
  ADD_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
  COMMENT_LOADING,
  COMMENTS_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
        loading: false,
      };
    case COMMENTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case COMMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
