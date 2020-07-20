const styles = (theme) => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navBar: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
    color:
      theme.palette.type === 'dark'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
});

export default styles;
