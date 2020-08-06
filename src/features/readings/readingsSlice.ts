import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReadings } from './get-readings';
import { ReadingsState } from '../../app/store';
import { getReading } from './get-reading';

export const fetchReadings = createAsyncThunk(
  'readings/fetchReadings',
  async ({ lectionary, date } : { lectionary: string; date: string; }) => getReadings(date, lectionary)
);

export const fetchReading = createAsyncThunk(
  'reading/fetchReading',
  async({ citation, version } : { citation: string; version: string; }) => getReading(citation, version)
);

export const readingsSlice = createSlice({
  name: 'readings',
  initialState: {
    status: 'idle',
    readings: [],
    error: undefined,
    date: null,
    lectionary: null,
    texts: {}
  } as ReadingsState,
  reducers: {
    setReadingCitation: (state, action) => {
      state.readings[action.payload.index] = {
        citation: action.payload.citation,
        type: action.payload.type
      };
    }
  },
  extraReducers: builder => {
    /* Fetch the list of readings */
    builder.addCase(fetchReadings.pending, (state) => {
      state.status = 'loading'
    });
    builder.addCase(fetchReadings.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.readings = action.payload.readings;
      state.date = action.payload.date;
      state.lectionary = action.payload.lectionary;
    });
    builder.addCase(fetchReadings.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      state.readings = [];
    });
    /* Fetch a single reading */
    builder.addCase(fetchReading.pending, (state, action) => {
      const citation = action.meta.arg.citation;
      state.texts[citation] = {
        status: 'loading',
        citation,
        version: action.meta.arg.version,
        reading: null,
        error: undefined
      }
    });
    builder.addCase(fetchReading.fulfilled, (state, action) => {
      const citation = action.payload.citation,
            reading = state.texts[citation];
      reading.status = 'succeeded'
      reading.citation = action.payload.citation;
      reading.version = action.payload.version;
      reading.reading = action.payload.reading;
    });
    builder.addCase(fetchReading.rejected, (state, action) => {
      const citation = action.meta.arg.citation,
            reading = state.texts[citation];
      reading.status = 'failed'
      reading.citation = citation;
      reading.version = action.meta.arg.version;
      reading.reading = null;
      state.error = action.error.message;
    });
  }
});

export const { setReadingCitation } = readingsSlice.actions;

export const selectReadingsStatus = (state : { readings: ReadingsState }) => state.readings.status;

export const selectAllReadings = (state : { readings: ReadingsState }) => state.readings.readings;

export default readingsSlice.reducer;