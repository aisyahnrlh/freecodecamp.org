import React, { useState, useEffect } from 'react';
import './App.css';
import Drumpad from './Drumpad';
import { bankOne, bankTwo } from './data';
import { useGlobalContext } from './context';

function App() {
  const [isPower, setIsPower] = useState(true);
  const [isBank, setIsBank] = useState(false);
  const { display, setDisplay } = useGlobalContext();
  const [volume, setVolume] = useState(0.4);

  useEffect(() => {
    if (isPower === false) {
      setDisplay(String.fromCharCode(160));
    }
  }, [isPower]);

  useEffect(() => {
    if (isBank) {
      setDisplay("Smooth Piano Kit");
    } else {
      setDisplay("Heater Kit");
    }
  }, [isBank]);

  const adjustVolume = (e) => {
    setVolume(e.target.value);
    setDisplay("Volume: " + Math.round(e.target.value * 100));
    setTimeout(() => setDisplay(String.fromCharCode(160)), 1000);
  }

  return (
    <div className="App">
      <h1>Drum Machine</h1>
      <div className="drum-machine" id="drum-machine">
        <div className="drums__buttons">
          {
            isBank ?
              bankTwo.map((item) => {
                return <Drumpad key={item.keyCode} {...item} power={isPower} volume={volume} />
              })
              : bankOne.map((item) => {
                return <Drumpad key={item.keyCode} {...item} power={isPower} volume={volume} />
              })
          }
        </div>

        <div className="settings">
          <div className="drums__toggle">
            <p>Power</p>
            <input type="checkbox" id="toggle" checked={isPower} onChange={() => setIsPower(!isPower)} />
            <label htmlFor="toggle"></label>
          </div>

          <p id="display">
            {display}
          </p>

          <div className="settings__volume">
            <label htmlFor="volume">Volume</label>
            <input type="range" id="volume" name="volume" min="0" max="1" value={volume} step="0.01" onChange={adjustVolume} />
          </div>

          <div className="drums__toggle">
            <p>Bank</p>
            <input type="checkbox" id="toggle1" checked={isBank} onChange={() => setIsBank(!isBank)} disabled={isPower === false} />
            <label htmlFor="toggle1"></label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
