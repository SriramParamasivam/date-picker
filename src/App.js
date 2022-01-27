import React from 'react';
import { DWDatePicker } from './features/DWDatePicker/DWDatePicker';
import './App.css';

function App() {
  return (
    <div className="App">
      <DWDatePicker calenderStartDay={2} />
    </div>
  );
}

export default App;
