import React, { Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ThemeContext from '../../context/theme/themeContext';
import PostContext from '../../context/post/postContext';
import ChartContext from '../../context/chart/chartContext';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChartMixed from '../layout/ChartMixed';
import ChartSingle from '../layout/ChartSingle';
import Goal from '../layout/Goal';
import LinearProgress from '@material-ui/core/LinearProgress';
import ButtonBack from '../layout/button/ButtonBack';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  chart: {
    overflow: 'hidden',
    boxShadow: '0px 2px 8px 0px rgba(0,0,0,.5)',
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '50px',
  },
  chips: {
    borderRadius: '0px',
  },
}));

const Graph = () => {
  const classes = useStyles();
  const themeContext = useContext(ThemeContext);
  const postContext = useContext(PostContext);
  const chartContext = useContext(ChartContext);
  const { isDarkMode } = themeContext;
  const { goals, setChartValue, value, isLoading } = chartContext;
  const { posts } = postContext;

  const dataFunction = (type) => {
    const typeArr = posts.filter((post) => post.name === type);
    const returnDistance = [];
    const returnDuration = [];
    const returnDurPlank = [];
    const returnReps = [];

    typeArr.forEach((val) => {
      if (val.name === 'cycling' || val.name === 'runing') {
        returnDistance.push({ x: val.mydate + ' GMT', y: val.distance });
        returnDuration.push({ x: val.mydate + ' GMT', y: val.duration });
      } else if (
        val.name === 'pushup' ||
        val.name === 'pullup' ||
        val.name === 'squat'
      ) {
        returnReps.push({ x: val.mydate + ' GMT', y: val.reps });
      } else {
        returnDurPlank.push({ x: val.mydate + ' GMT', y: val.duration });
      }
    });

    if (returnReps !== []) {
      returnReps.sort((a, b) => {
        return new Date(a.x) - new Date(b.x);
      });
    }
    if (returnDuration !== []) {
      returnDuration.sort((a, b) => {
        return new Date(a.x) - new Date(b.x);
      });
    }
    if (returnDistance !== []) {
      returnDistance.sort((a, b) => {
        return new Date(a.x) - new Date(b.x);
      });
    }
    if (returnDurPlank !== []) {
      returnDurPlank.sort((a, b) => {
        return new Date(a.x) - new Date(b.x);
      });
    }
    return { returnDistance, returnDuration, returnReps, returnDurPlank };
  };

  const {
    returnDistance,
    returnDuration,
    returnReps,
    returnDurPlank,
  } = dataFunction(value);

  let chartTheme;
  isDarkMode ? (chartTheme = 'dark') : (chartTheme = 'light');
  let chartBackground;
  if (!isDarkMode) {
    chartBackground = '#ffffff';
  }

  const handleChange = (event, newValue) => {
    setChartValue(newValue);
  };

  const getGoalByTarget = () => {
    const goalArray = goals.filter((val) => {
      return val.name === value;
    });
    return goalArray.length === 0 ? null : goalArray[0].target;
  };

  return (
    <Fragment>
      <Container>
        <Box component='div' className={classes.mainBox}>
          {isLoading ? (
            <LinearProgress color='primary' />
          ) : (
            <Fragment>
              <Paper elevation={4} className={classes.buttonBox}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor='primary'
                  textColor='primary'
                  variant='scrollable'
                >
                  <Tab label='cycling' value='cycling' />
                  <Tab label='runing' value='runing' />
                  <Tab label='pushup' value='pushup' />
                  <Tab label='pullup' value='pullup' />
                  <Tab label='squat' value='squat' />
                  <Tab label='plank' value='plank' />
                </Tabs>
              </Paper>
              <Paper elevation={4}>
                {value === 'cycling' && goals !== null && (
                  <ChartMixed
                    returnDistance={returnDistance}
                    returnDuration={returnDuration}
                    chartBackground={chartBackground}
                    chartTheme={chartTheme}
                    value={value}
                    goalTarget={getGoalByTarget('cycling')}
                  />
                )}
                {value === 'runing' && goals !== null && (
                  <ChartMixed
                    returnDistance={returnDistance}
                    returnDuration={returnDuration}
                    chartBackground={chartBackground}
                    chartTheme={chartTheme}
                    value={value}
                    goalTarget={getGoalByTarget('runing')}
                  />
                )}
                {value === 'pushup' && goals !== null && (
                  <ChartSingle
                    returnReps={returnReps}
                    chartBackground={chartBackground}
                    chartTheme={chartTheme}
                    value={value}
                    goalTarget={getGoalByTarget('pushup')}
                  />
                )}
                {value === 'pullup' && goals !== null && (
                  <ChartSingle
                    returnReps={returnReps}
                    chartBackground={chartBackground}
                    chartTheme={chartTheme}
                    value={value}
                    goalTarget={getGoalByTarget('pullup')}
                  />
                )}
                {value === 'squat' && goals !== null && (
                  <ChartSingle
                    returnReps={returnReps}
                    chartBackground={chartBackground}
                    chartTheme={chartTheme}
                    value={value}
                    goalTarget={getGoalByTarget('squat')}
                  />
                )}
                {value === 'plank' && goals !== null && (
                  <ChartSingle
                    returnDurPlank={returnDurPlank}
                    chartBackground={chartBackground}
                    chartTheme={chartTheme}
                    value={value}
                    goalTarget={getGoalByTarget('plank')}
                  />
                )}
              </Paper>
              <Paper elevation={4}>
                <Goal />
              </Paper>
              <ButtonBack />
            </Fragment>
          )}
        </Box>
      </Container>
    </Fragment>
  );
};

export default Graph;
