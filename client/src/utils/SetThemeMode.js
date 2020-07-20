import React, { useContext } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { orange, green } from '@material-ui/core/colors';
import themeContext from '../context/theme/themeContext';

const SetThemeMode = (props) => {
  const ThemeContext = useContext(themeContext);
  const { isDarkMode } = ThemeContext;
  const theme = createMuiTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
      primary: orange,
      secondary: green,
    },
  });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default SetThemeMode;
