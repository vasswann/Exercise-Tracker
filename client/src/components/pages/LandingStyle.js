import Cycling from '../../img/cycling.jpg';
import Track from '../../img/track.jpg';

const styles = (theme) => ({
  container: {
    height: '100%',
    position: 'relative',
  },
  upperBox: {
    position: 'relative',
    backgroundColor: 'rgba(250,120,0)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50%',
    '&::after': {
      content: '""',
      backgroundImage: `url(${Cycling})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      opacity: '.8',
    },
  },
  lowerBox: {
    position: 'relative',
    backgroundColor: 'rgba(250,120,0)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50%',
    '&::after': {
      content: '""',
      backgroundImage: `url(${Track})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      opacity: '.8',
    },
  },
  button: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '30px',
    fontWeight: 'bold',
    padding: '10px 40px',
  },
  item: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    padding: '5px 15px',
    fontSize: '30px',
    opacity: '0.8',

    textTransform: 'uppercase',
    position: 'absolute',
    top: '10%',
    left: '60%',
    textAlign: 'center',
  },
  lowerItem: {
    top: '80%',
    left: '20%',
  },
});

export default styles;
