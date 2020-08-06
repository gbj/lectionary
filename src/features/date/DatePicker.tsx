import React from 'react';
import { setDate, selectDate } from './dateSlice';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from './formatDate';
import { nextSunday } from './next-sunday';

export const DatePicker = () => {
  const date = useSelector(selectDate),
        dispatch = useDispatch();

  return (
    <React.Fragment>
      <label htmlFor="date">
        Date
        <input
          type="date"
          id="date"
          value={date}
          onChange={e => dispatch(setDate(e.target.value))}
        />
      </label>
      <button type="button" onClick={e => dispatch(setDate(formatDate(nextSunday(new Date()))))}>
        This Sunday
      </button>
    </React.Fragment>
  );
}


