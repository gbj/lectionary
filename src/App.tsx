import React from 'react';
import logo from './assets/logo.svg';
import { DatePicker } from './features/date/DatePicker';
import './App.css';
import { BibleVersionPicker } from './features/bible-version-picker/BibleVersionPicker';
import { LectionaryPicker } from './features/lectionary-picker/LectionaryPicker';
import { Readings } from './features/readings/Readings';
import { useSelector } from 'react-redux';
import { selectLectionary } from './features/lectionary-picker/lectionarySlice';
import { DayName } from './features/day/DayName';
import { selectDate } from './features/date/dateSlice';

function App() {
  const lectionary = useSelector(selectLectionary),
        date = useSelector(selectDate);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>The Lectionary App</h1>
      </header>
      <fieldset aria-label="Choose Date" className='controls'>
        <DatePicker/>
      </fieldset>
      <fieldset aria-label="Choose Lectionary and Bible Version" className='controls'>
        <LectionaryPicker/>
        <BibleVersionPicker/>
      </fieldset>
      <DayName date={date}/>
      <Readings lectionary={lectionary}/>
    </div>
  );
}

export default App;
