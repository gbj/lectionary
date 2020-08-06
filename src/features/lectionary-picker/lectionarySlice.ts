import { createSlice } from '@reduxjs/toolkit';

export const lectionarySlice = createSlice({
  name: 'lectionary',
  initialState: 'rclsunday',
  reducers: {
    setLectionary: (state, action) => state = action.payload
  }
});

export const { setLectionary } = lectionarySlice.actions;

export const selectLectionary = (state : { lectionary: string; }) => state.lectionary;

export default lectionarySlice.reducer;
