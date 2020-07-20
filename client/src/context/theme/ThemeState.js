import React, { useReducer } from 'react';
import themeContext from './themeContext';
import themeReducer from './themeReducer';
import { SET_DARKMODE } from '../types';

const ThemeState = (props) => {
  const initialState = {
    isDarkMode: true,
  };

  const [state, dispatch] = useReducer(themeReducer, initialState);

  const changeMode = () => {
    dispatch({ type: SET_DARKMODE });
  };

  return (
    <themeContext.Provider value={{ isDarkMode: state.isDarkMode, changeMode }}>
      {props.children}
    </themeContext.Provider>
  );
};

export default ThemeState;
