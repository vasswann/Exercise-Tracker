import React, { Fragment, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Calendar from '../layout/Calendar';
import Table from '../layout/Table';
import SpeedDialMenu from '../layout/SpeedDialMenu';
import ExerciseList from '../layout/ExerciseList';
import DonutChart from '../layout/DonutChart';
import ThemeContext from '../../context/theme/themeContext';
import PostContext from '../../context/post/postContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 18,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseListMaxHeight: {
    height: '469px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4rem',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(255,165,0,.5)',
      webkitBoxShadow: 'inset 0 0 6px rgba(255,165,0,.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'orange',
      outline: '1px solid slategrey',
    },
  },
}));

const GridComponent = () => {
  const classes = useStyles();
  const postContext = useContext(PostContext);
  const themeContext = useContext(ThemeContext);
  const { posts } = postContext;
  const { isDarkMode } = themeContext;
  const [selectedDate, setSelectedDate] = useState({
    date: new Date().toDateString(),
  });

  const dates = posts
    .map((d) => {
      return d.mydate;
    })
    .sort((a, b) => {
      return new Date(b) - new Date(a);
    });

  const lastDayExecise = posts.filter((date) => {
    return date.mydate === dates[0];
  });

  const currentDatePost = (date = new Date().toDateString()) => {
    setSelectedDate({ date });
  };
  let selectedPost = [];
  selectedPost = posts.filter((date) => {
    return date.mydate === selectedDate.date;
  });

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Paper className={classes.paper} elevation={5}>
              <Calendar posts={posts} currentDatePost={currentDatePost} />
              <SpeedDialMenu />
            </Paper>
          </Grid>
          <Grid item xs={12} md={7} height='100%'>
            <Paper
              className={`${classes.paper} ${classes.exerciseListMaxHeight}`}
              elevation={5}
            >
              <ExerciseList
                lastDayExecise={lastDayExecise}
                selectedPost={selectedPost}
                selectedDate={selectedDate}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box height='268px' className={classes.loading}>
              <DonutChart key={isDarkMode} isDarkMode={isDarkMode} />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Table posts={posts} />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default GridComponent;
