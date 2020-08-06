import { configureStore } from '@reduxjs/toolkit';
import dateReducer from '../features/date/dateSlice';
import bibleVersionReducer from '../features/bible-version-picker/bibleVersionSlice';
import lectionaryReducer from '../features/lectionary-picker/lectionarySlice';
import readingsReducer from '../features/readings/readingsSlice';
import dayReducer from '../features/day/daySlice';
import { Entry } from '../features/readings/get-readings';
import { BibleReading } from '@venite/ldf';
import { Day } from '../features/day/get-day';

export default configureStore({
  reducer: {
    date: dateReducer,
    bibleVersion: bibleVersionReducer,
    lectionary: lectionaryReducer,
    readings: readingsReducer,
    day: dayReducer
  },
});

export type AppState = {
  date: string;
  bibleVersion: string;
  lectionary: string;
  readings: ReadingsState;
  day: DayState;
}

type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ReadingsState = {
  status: LoadingStatus;
  readings: Entry[];
  error: string | undefined;
  date: string | null;
  lectionary: string | null;
  texts: { [citation: string]: TextState };
}

export type TextState = {
  status: LoadingStatus;
  error: string | undefined;
  citation: string;
  version: string;
  reading: BibleReading | null;
}

export type DayState = {
  status: LoadingStatus;
  date: string | undefined;
  day: Day | undefined;
  error: string | undefined;
}