import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectReadingsStatus, fetchReadings, selectAllReadings, setReadingCitation } from './readingsSlice';
import { selectDate } from '../date/dateSlice';
import { Entry } from './get-readings';
import { AppState } from '../../app/store';
import { selectBibleVersion } from '../bible-version-picker/bibleVersionSlice';
import logo from '../../assets/logo.svg';
import error from '../../assets/error.svg';
import { Reading } from './Reading';
import { selectDay } from '../day/daySlice';

export type ReadingsProps = {
  lectionary: string;
}

export const Readings = ({ lectionary } : ReadingsProps) => {
  const dispatch = useDispatch(),
    status = useSelector(selectReadingsStatus),
    date = useSelector(selectDate),
    readings : Entry[] = useSelector(selectAllReadings),
    previousDate = useSelector((state : AppState) => state.readings.date),
    previousLectionary = useSelector((state : AppState) => state.readings.lectionary),
    bibleVersion = useSelector(selectBibleVersion);

  const day = useSelector(selectDay),
    propers = day?.propers,
    year = day?.years?.rclsunday;

  console.log('Readings - day = ', day);

  useEffect(() => {
    // make it reload when Date or Lectionary change, if Day is not undefined
    if(day && (status === 'idle' || (status === 'succeeded' && (lectionary !== previousLectionary || date !== previousDate)))) {
      dispatch(fetchReadings({ lectionary, date, day: day?.slug, year, propers }))
    }
  }, [status, dispatch, day, date, lectionary, previousDate, previousLectionary, propers, year]);

  const changeReading = (index : number, type : string, oldCitation : string) => {
    const citation = prompt('Please enter a new Biblical citation.', oldCitation);
    if(citation) {
      dispatch(setReadingCitation({ index, citation, type }));
    }
  }

  return (
    <React.Fragment>
      {/* Loading */}
      {status === 'loading' && <figure className='loading'>
        <img src={logo} className='floating' alt='Loading...'/>
        <figcaption>Loading Readings</figcaption>
      </figure>}
      {/* Errors */}
      {status === 'failed' && <figure className='error'>
        <img src={error} className='floating' alt='Error'/>
        <figcaption>Loading Readings</figcaption>
      </figure>}
      {/* Data */}
      {status === 'succeeded' && <section>
        <h3 className='readings-heading'>The Readings</h3>
        { readings.map((entry, entryIndex) =>
          <article className='reading' key={`${entry.type}-${entry.citation}`}>
            <header>
              <h4 className='type'>{READING_LABELS[entry.type]}</h4>
              <h5 className='citation'>{entry.citation.replace('psalm_', 'Psalm ')}</h5>
              <button type='button' onClick={() => changeReading(entryIndex, entry.type, entry.citation)}>
                Change Reading
              </button>
            </header>
            <Reading key={entry.citation} citation={entry.citation} version={bibleVersion}/>
          </article>
        )}
      </section>}
    </React.Fragment>
  )
}

const READING_LABELS : { [x: string]: string } = {
  'first_reading': 'First Reading',
  'holy_day_morning_1': 'First Reading',
  'holy_day_evening_1': 'First Reading',
  'morning_psalms': 'Psalm',
  'evening_psalms': 'Psalm',
  'second_reading': 'Second Reading',
  'holy_day_morning_2': 'Second Reading',
  'holy_day_evening_2': 'Second Reading',
  'gospel': 'Gospel'
};