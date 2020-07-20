import React, { Fragment } from 'react';
import Chart from 'react-apexcharts';

const ChartMixed = ({
  returnDistance,
  returnDuration,
  chartBackground,
  chartTheme,
  goalTarget,
  value,
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
        seriesName: 'Distance',
        min: function (min) {
          return min - min * 0.05;
        },
        max: function (max) {
          return returnDistance.length === 0
            ? max
            : goalTarget + goalTarget * 0.05;
        },
        title: {
          text: 'Distance',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Duration',
        },
      },
    ],
    stroke: {
      show: true,
      width: [0, 4],
      // colors: ['transparent'],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: `${value.length < 3 ? '10%' : '30%'}`,
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    title: {
      text: 'Your Exercise Progression',
      offsetX: 20,
      offsetY: 10,
      style: {
        fontWeight: '100',
      },
    },
    colors: ['#FF4500', '#b86f04'],
    annotations: {
      position: 'back',
      yaxis: [
        {
          y: goalTarget ? goalTarget : -100,
          strokeDashArray: 0,
          borderColor: '#ff0000',
          borderWidth: 3,
          offsetX: -15,
          label: {
            borderWidth: 0,
            textAnchor: 'end',
            style: {
              color: '#fff',
              background: '#ff0000',
              fontSize: '13px',
            },
            offsetX: 15,
            offsetY: 0,
            text: 'Your Goal!',
          },
        },
      ],
    },
  };

  const series = [
    {
      name: 'Distance',
      type: 'column',
      data: returnDistance,
    },
    {
      name: 'Duration',
      type: 'line',
      data: returnDuration,
    },
  ];

  return (
    <Fragment>
      <Chart options={options} series={series} width='100%' height='415px' />
    </Fragment>
  );
};

export default ChartMixed;
