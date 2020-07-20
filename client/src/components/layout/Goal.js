import React, { useState, useContext, Fragment, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChartContext from '../../context/chart/chartContext';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '80%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  formControl: {
    minWidth: '177px',
  },
  setupForm: {
    display: 'flex',
    width: '100%',
  },
}));

const Goal = () => {
  const classes = useStyles();
  const chartContext = useContext(ChartContext);
  const { value, addGoal, goals, updateGoals, deleteGoals } = chartContext;
  const [expanded, setExpanded] = useState(false);
  const [goal, setGoal] = useState({ goal: '0' });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (goals !== null) {
      if (
        goals.some((val) => {
          return val.name === value;
        })
      ) {
        const goalValue = goals.filter((val) => {
          return val.name === value;
        });
        setGoal({ ...goal, goal: goalValue[0].target });
      } else {
        setGoal({ ...goal, goal: '0' });
      }
    }
    // eslint-disable-next-line
  }, [value, expanded]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFormChange = (e) => {
    setGoal({ ...goal, goal: e.target.value });
  };

  const handleUpdateGoal = () => {
    const current = goals.filter((val) => val.name === value);
    current[0].target = goal.goal;
    if (goal.goal <= '0' || goal.goal === []) {
      enqueueSnackbar('Please add a positive number as a Goal 😢 !!!', {
        variant: 'error',
      });
    } else {
      updateGoals(current[0]);
      setExpanded(false);
      enqueueSnackbar('Your Goal is Updated 🧧 Good Luck !!!', {
        variant: 'success',
      });
    }
  };

  const handleDeleteGoal = () => {
    const current = goals.filter((val) => val.name === value);
    deleteGoals(current[0]._id);
    setExpanded(false);
    enqueueSnackbar(
      'Your Goal has been Deleted !!! Set another Goal, to improve',
      {
        variant: 'success',
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalObject = { name: value, target: goal.goal };
    if (goal.goal <= '0' || goal.goal === []) {
      enqueueSnackbar('Please add a positive number as a Goal 😢 !!!', {
        variant: 'error',
      });
    } else {
      addGoal(goalObject);
      setGoal({ ...goal, goal: '0' });
      setExpanded(false);
      enqueueSnackbar('Your Goal is SAVED 🧧 Good Luck !!!', {
        variant: 'success',
      });
    }
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            {goals !== null &&
            goals.some((val) => {
              return val.name === value;
            }) ? (
              <Typography className={classes.heading}>
                Click here to update or delete your {value} target
              </Typography>
            ) : (
              <Typography className={classes.heading}>
                Click here to add your {value} target
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <form
              noValidate
              className={classes.setupForm}
              onSubmit={handleSubmit}
            >
              <TextField
                id='goal'
                label='Goal'
                variant='outlined'
                color='primary'
                type='number'
                value={goal.goal}
                onChange={handleFormChange}
                className={classes.formControl}
              />
              {goals !== null &&
              goals.some((val) => {
                return val.name === value;
              }) ? (
                <Fragment>
                  {' '}
                  <Button onClick={handleUpdateGoal} color='primary' fullWidth>
                    Update
                  </Button>
                  <Button onClick={handleDeleteGoal} color='primary' fullWidth>
                    Delete
                  </Button>{' '}
                </Fragment>
              ) : (
                <Button type='submit' color='primary' fullWidth>
                  Add
                </Button>
              )}
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
    </Fragment>
  );
};

export default Goal;
