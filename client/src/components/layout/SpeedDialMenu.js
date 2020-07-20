import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { ReactComponent as PullUp } from '../../img/pullup.svg';
import { ReactComponent as PushUp } from '../../img/pushup.svg';
import { ReactComponent as Squat } from '../../img/squat.svg';
import { ReactComponent as Plank } from '../../img/pushup.svg';
import FormDialog from '../forms/FormDialog';

// i have a warining issue with this speedDial component
// with React.StrictMode()

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  speedDial: {
    position: 'absolute',
    top: theme.spacing(-51),
    right: theme.spacing(0),
  },
  svgIcon: {
    fill:
      theme.palette.type === 'light'
        ? theme.palette.grey[700]
        : theme.palette.grey[300],
    width: '1.5rem',
    height: '1.5rem',
  },
}));

const SpeedDialMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState({});
  const [openDial, setOpenDial] = React.useState(false);

  const actions = [
    {
      icon: <DirectionsBikeIcon />,
      name: 'Cycling',

      operation: 'cycling',
    },
    {
      icon: <DirectionsRunIcon />,
      name: 'Runing',

      operation: 'runing',
    },
    {
      icon: <PullUp className={classes.svgIcon} />,
      name: 'Pull Up',

      operation: 'pullup',
    },
    {
      icon: <PushUp className={classes.svgIcon} />,
      name: 'Push Up',

      operation: 'pushup',
    },
    {
      icon: <Squat className={classes.svgIcon} />,
      name: 'Squat',

      operation: 'squat',
    },
    {
      icon: <Plank className={classes.svgIcon} />,
      name: 'Plank',

      operation: 'plank',
    },
  ];

  useEffect(() => {
    setDialog(...actions);
    //  eslint-disable-next-line
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialClose = () => {
    setOpenDial(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = (action) => {
    setDialog({ ...action });
    setOpen(false);
    setOpenDial(true);
  };

  const dialProps = { handleDialClose, openDial, dialog, handleClose };
  return (
    <Fragment>
      <div className={classes.root}>
        <SpeedDial
          ariaLabel='SpeedDial Icon '
          className={classes.speedDial}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction='up'
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                handleClick(action);
              }}
            />
          ))}
        </SpeedDial>
        <FormDialog dialProps={dialProps} />
      </div>
    </Fragment>
  );
};

export default SpeedDialMenu;
