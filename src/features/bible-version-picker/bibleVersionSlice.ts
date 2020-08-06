import { createSlice } from '@reduxjs/toolkit';

export const bibleVersionSlice = createSlice({
  name: 'bibleVersion',
  initialState: 'NRSV',
  reducers: {
    setBibleVersion: (state, action) => state = action.payload
  }
});

export const { setBibleVersion } = bibleVersionSlice.actions;

export const selectBibleVersion = (state : { bibleVersion: string; }) => state.bibleVersion;

export default bibleVersionSlice.reducer;
