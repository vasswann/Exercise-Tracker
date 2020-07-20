import React, { Fragment } from 'react';
import Chart from 'react-apexcharts';

const ChartSingle = ({
  returnReps,
  chartBackground,
  chartTheme,
  returnDurPlank,
  value,
  goalTarget,
}) => {
  const options = {
    chart: {
      toolbar: {
        offsetX: -8,
        offsetY: 8,
        tools: {
          download: true,
        },
      },
    },
    chartTheme: {
      background: chartBackground,
    },
    theme: {
      mode: chartTheme,
    },

    xaxis: {
      type: 'datetime',
    },
    yaxis: [
      {
        title: {
          text: `${value === 'plank' ? 'Duration' : 'Reps'}`,
        },
        min: function (min) {
          return 0;
        },
        max: function (max) {
          return goalTarget !== null && goalTarget > max
            ? goalTarget + goalTarget * 0.05
            : max + max * 0.05;
        },
      },
    ],
    stroke: {
      show: true,
      width: [4],
      colors: ['transparent'],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: `${value.length < 3 ? '10%' : '30%'}`,
        endingShape: 'rounded',
      },
    },

    title: {
      text: 'Your Exercise Progression',
      offsetX: 20,
      offsetY: 10,
      style: {
        fontWeight: '100',
      },
    },
    colors: ['#FF4500'],
    annotations: {
      position: 'front',
      yaxis: [
        {
          y: goalTarget ? goalTarget : -100,
          strokeDashArray: 0,
          borderColor: '#ff0000',
          borderWidth: 3,
          offsetX: 0,
          yAxisIndex: 0,
          label: {
            borderWidth: 0,
            textAnchor: 'end',
            style: {
              color: '#fff',
              background: '#ff0000',
              fontSize: '13px',
            },
            offsetX: 0,
            offsetY: 0,
            text: 'Your Goal!',
          },
        },
      ],
    },
  };

  let series = [];
  if (value === 'plank') {
    series = [
      {
        name: 'Duration',
        type: 'column',
        data: returnDurPlank,
      },
    ];
  } else {
    series = [
      {
        name: 'Reps',
        type: 'column',
        data: returnReps,
      },
    ];
  }

  return (
    <Fragment>
      <Chart options={options} series={series} width='100%' height='415px' />
    </Fragment>
  );
};

export default ChartSingle;
