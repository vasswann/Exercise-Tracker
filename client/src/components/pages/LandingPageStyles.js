import Background from '../../img/landing_page.jpg';
const styles = (theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  typography: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    width: '50%',
    padding: '1rem',
    opacity: '0.8',
  },
  underLine: {
    borderBottom: `4px solid ${theme.palette.primary.dark}`,
  },
});

export default styles;
