import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DayState } from '../../app/store';
import { fetchDay } from './daySlice';
import { Day } from './get-day';
import { dateFromYMDString } from '@venite/ldf';

type DayNameProps = {
  date: string;
}

function holyDayObserved(day : Day) : boolean {
  return !!day.holy_days.find(hd => hd ? hd.slug === day.slug : false);
}

function holyDayName(day : Day) : string {
  const holyDay = day.holy_days.find(hd => hd);
  return holyDay ? holyDay.name : undefined;
}

function dateIsSunday(date : string) : boolean {
  const d = dateFromYMDString(date);
  return d.getDay() === 0;
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DayName = ({ date } : DayNameProps) => {
  const day = useSelector((state : { day : DayState}) => state.day);

  const status = day?.status || 'idle',
        previousDate = day?.date,
        dispatch = useDispatch();

  useEffect(() => {
    // make it reload when citation or version change
    if(date && (status === 'idle' || (status === 'succeeded' && date !== previousDate))) {
      dispatch(fetchDay({ date }))
    }
  }, [status, dispatch, date, previousDate])

  const holyDay = Boolean(day.day && holyDayObserved(day.day)),
        holyDayNameStr = day?.day !== undefined && holyDayName(day?.day),
        isSunday = day?.day && dateIsSunday(day.day.date),
        liturgyDate = dateFromYMDString(date);


  return (
    <React.Fragment>
      {day.day?.date && !(holyDay && holyDayNameStr) &&
        <h2 className='day'>
          { isSunday && day.day.week.name }
          { !isSunday && WEEKDAYS[liturgyDate.getDay()]}
          { !isSunday && ' after ' }
          { !isSunday && !day.day.omit_the && ' the ' }
          { !isSunday && day.day.week.name }
        </h2>
      }
      { holyDay && holyDayNameStr && <h2 className='day'>{holyDayNameStr}</h2>}
      { day.day?.week?.proper && <h4 className='day'>{day.day?.week?.proper?.label}</h4> }
    </React.Fragment>
  )
}