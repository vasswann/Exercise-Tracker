import { SET_DARKMODE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_DARKMODE: {
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    }
    default:
      return state;
  }
};
