import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Day, getDay } from './get-day';
import { AppState, DayState } from '../../app/store';

export const fetchDay = createAsyncThunk(
  'day/fetchDay',
  async ({ date } : { date: string; }) => getDay(date)
);

export const daySlice = createSlice({
  name: 'day',
  initialState: {
    status: 'idle',
    date: undefined,
    day: undefined,
    error: undefined
  } as DayState,
  reducers: { },
  extraReducers: builder => {
    builder.addCase(fetchDay.pending, (state) => {
      state.status = 'loading'
    });
    builder.addCase(fetchDay.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.day = action.payload.day;
      state.date = action.payload.date;
    });
    builder.addCase(fetchDay.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      state.day = undefined;
    });
  }
});

//export const { setDate } = daySlice.actions;

export const selectDate = (state : AppState) => state.date;

export const selectDay : (state: AppState) => Day | undefined = (state : AppState) => state.day.day;

export default daySlice.reducer;
