import { createSlice } from '@reduxjs/toolkit';
import { formatDate } from './formatDate';
import { nextSunday } from './next-sunday';

export const dateSlice = createSlice({
  name: 'date',
  initialState: formatDate(nextSunday(new Date())),
  reducers: {
    setDate: (state, action) => state = action.payload
  }
});

export const { setDate } = dateSlice.actions;

export const selectDate = (state : { date: string; }) => state.date;

export default dateSlice.reducer;
