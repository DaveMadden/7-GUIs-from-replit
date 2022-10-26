import React from 'react';
import './App.css';
import Counter from './Counter';
import FlightBooker from './FlightBooker';
import TempConv from './TempConv';
import Timer from './Timer';
import CRUD from './CRUD'
import CircleDrawer from './CircleDrawer';
import Parser from './Parser'

function App() {
  return (
    <div className="app">
      <h1>Dave Madden & The (6 out of) 7 GUIs</h1>
      <Parser />
      <Counter />
      <TempConv />
      <FlightBooker />
      <Timer />
      <CRUD />
      <CircleDrawer />
      
    </div>
  );
}

export default App;
