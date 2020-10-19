import React from 'react';
import RentForm from './components/forms/RentForm';

import './App.css';

function App() {
  return (
    <div className="app">
      <h1 className="app__title">Awesome Bike Rental</h1>
      <h2 className="app__subtitle">
        <img
          className="app__subtitle-emoji"
          alt="money-mouth"
          src={require("./static/emoji/money-mouth.png")}
        />&nbsp;Create new rent
      </h2>
      <RentForm />
    </div>
  );
}

export default App;
