import React, { useState, Fragment } from 'react';
import { Badge } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import CheckIcon from '@material-ui/icons/Check';

const Calendar = ({ posts, currentDatePost }) => {
  const dates = posts.map((d) => {
    return d.mydate;
  });

  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMonthChange = async () => {
    // just select random days to simulate server side based data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const onChange = (e) => {
    handleDateChange(e);
    currentDatePost(e.toDateString());
  };

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          variant='static'
          label='With server data'
          value={selectedDate}
          onChange={onChange}
          onMonthChange={handleMonthChange}
          disableFuture
          renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
            const date = day; // skip this step, it is required to support date libs
            const isSelected =
              isInCurrentMonth && dates.includes(date.toDateString());

            // You can also use our internal <Day /> component
            return (
              <Badge
                badgeContent={
                  isSelected ? <CheckIcon color='secondary' /> : undefined
                }
                // color='secondary'
                overlap='circle'
              >
                {dayComponent}
              </Badge>
            );
          }}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
};

export default Calendar;
