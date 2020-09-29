import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLectionary, selectLectionary } from './lectionarySlice';

const LECTIONARIES = [
  { value: 'rclsundayTrack1', label: 'RCL Track 1' },
  { value: 'rclsunday', label: 'RCL Track 2' },
  { value: 'morning_prayer', label: 'Morning Prayer (1979 BCP)' },
  { value: 'evening_prayer', label: 'Evening Prayer (1979 BCP)' }
];
const LECTIONARY_CODES = ['rclsundayTrack1', 'rclsunday', 'bcp1979_daily_office'] as const;
type Lectionary = typeof LECTIONARY_CODES[number];

export const LectionaryPicker = () => {
  const dispatch = useDispatch(),
        lectionary = useSelector(selectLectionary);

  return (
    <label htmlFor="lectionary">
      Lectionary
      <select
        id="lectionary"
        name="lectionary"
        value={lectionary}
        onChange={e => dispatch(setLectionary(e.target.value))}
      >
        {LECTIONARIES.map(version =>
          <option key={version.value} value={version.value}>{version.label}</option>
        )}
      </select>
    </label>
  )
}