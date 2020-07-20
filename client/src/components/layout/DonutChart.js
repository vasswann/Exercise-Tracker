import React, { useContext } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Box from '@material-ui/core/Box';
import styles from './DonutChartStyle';
import Chart from 'react-apexcharts';
import ThemeContext from '../../context/theme/themeContext';
import PostContext from '../../context/post/postContext';

const DonutChart = ({ classes }) => {
  const themeContext = useContext(ThemeContext);
  const postContext = useContext(PostContext);
  const { isDarkMode } = themeContext;
  const { posts } = postContext;
  const donutObj = posts.reduce((obj, v) => {
    obj[v.name] = (obj[v.name] || 0) + 1;
    return obj;
  }, {});
  const exerciseArray = [
    'cycling',
    'runing',
    'pushup',
    'pullup',
    'squat',
    'plank',
  ];
  let donutArray = [];
  const makeArray = (exer) => {
    if (donutObj[exer]) {
      donutArray.push(donutObj[exer]);
    } else {
      donutArray.push(0);
    }
  };
  for (let i = 0; i < exerciseArray.length; i++) {
    makeArray(exerciseArray[i]);
  }
  if (donutArray.every((e, i, arr) => e === 0)) {
    donutArray = [];
  }
  const donutArrayTotal = donutArray.reduce((a, b) => {
    return a + b;
  }, 0);

  let chartTheme;
  isDarkMode ? (chartTheme = 'dark') : (chartTheme = 'light');
  let chartBackground;
  if (!isDarkMode) {
    chartBackground = '#ffffff';
  }

  const options = {
    chartTheme: {
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,
        dynamicAnimation: {
          enabled: true,
          speed: 550,
        },
      },
      background: chartBackground,
    },
    labels: ['Cycling', 'Runing', 'Push Up', 'Pull Up', 'Squat', 'Plank'],

    stroke: {
      width: 0,
    },
    title: {
      text: 'Favourite Exercise',
      margin: 20,
      style: { fontWeight: '100', fontSize: '17px' },
    },
    dataLabels: {
      enabled: false,
    },
    theme: {
      mode: chartTheme,
      monochrome: {
        enabled: true,
        color: '#FF4500',
        shadeTo: 'light',
        shadeIntensity: 1,
      },
    },
    noData: {
      text: 'Start Your Progress, Add your first exercise',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
    },
    tooltip: {
      style: {
        fontSize: '20px',
      },
      y: {
        formatter: function (val) {
          return Number((val * 100) / donutArrayTotal).toFixed(2) + ' %';
        },
      },
    },
  };

  const series = donutArray;

  return (
    <Box className={classes.chart}>
      <Chart
        options={options}
        series={series}
        type='donut'
        width='100%'
        height='268px'
      />
    </Box>
  );
};

export default withStyles(styles)(DonutChart);
