import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isStart, setIsStart] = useState(false);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [isSession, setIsSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const audio = document.getElementById("beep");

  let timer = 0;

  useEffect(() => {
    setMinutes(sessionLength);
  }, [sessionLength])

  useEffect(() => {
    if (isStart) {
      handleStart();
    } else {
      handleStop();
    }
    return () => {
      clearInterval(timer);
    }
  })

  useEffect(() => {
    if (isSession) {
      setMinutes(sessionLength);
      setSeconds(0);
    } else {
      setMinutes(breakLength);
      setSeconds(0);
      setTimeLeft(breakLength * 60);
    }
  }, [isSession, sessionLength, breakLength]);

  const countDown = () => {
    if (seconds === 0) {
      if (minutes === 0) {
        // clearInterval(timer);
        setIsSession(!isSession);
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    } else if (seconds === 1 && minutes === 0) {
      audio.currentTime = 0;
      audio.play();
      setSeconds(seconds - 1);
    } else {
      setSeconds(seconds - 1);
    }

    setTimeLeft((minutes * 60) + seconds);
  }

  const handleStart = () => {
    timer = setInterval(countDown, 1000);
  }

  const handleStop = () => {
    clearInterval(timer);
  }

  const handleReset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setMinutes(sessionLength);
    setSeconds(0);
    setIsStart(false);
    setIsSession(true);
    audio.pause();
    audio.currentTime = 0;
  }

  return (
    <div className="App">
      <h1>Pomodoro App</h1>
      <div className="settings">
        <div className="settings__session">
          <div id="session-label">Session Length</div>
          <button id="session-increment" onClick={() => sessionLength >= 60 ? setSessionLength(60) : setSessionLength(sessionLength + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16.132" height="13.981" viewBox="0 0 16.132 13.981">
              <path id="Path_4" data-name="Path 4" d="M22.413,24.172a1.613,1.613,0,0,1-1.625-.02L10.033,17.7a1.613,1.613,0,0,1,0-2.767L20.788,8.48a1.613,1.613,0,0,1,2.443,1.383V22.769a1.613,1.613,0,0,1-.818,1.4Z" transform="translate(24.382 -9.25) rotate(90)" fill="#fff" />
            </svg>
          </button>
          <div id="session-length">{sessionLength}</div>
          <button id="session-decrement" onClick={() => sessionLength <= 1 ? setSessionLength(1) : setSessionLength(sessionLength - 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16.132" height="13.981" viewBox="0 0 16.132 13.981">
              <path id="Path_4" data-name="Path 4" d="M13.163.209a1.613,1.613,0,0,0-1.625.02L.783,6.683a1.613,1.613,0,0,0,0,2.767L11.538,15.9a1.613,1.613,0,0,0,2.443-1.383V1.613a1.613,1.613,0,0,0-.818-1.4Z" transform="translate(0 13.981) rotate(-90)" fill="#fff" />
            </svg>
          </button>
        </div>
        <div className="settings__break">
          <div id="break-label">Break Length</div>
          <button id="break-increment" onClick={() => breakLength < 60 ? setBreakLength(breakLength + 1) : setBreakLength(60)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16.132" height="13.981" viewBox="0 0 16.132 13.981">
              <path id="Path_4" data-name="Path 4" d="M22.413,24.172a1.613,1.613,0,0,1-1.625-.02L10.033,17.7a1.613,1.613,0,0,1,0-2.767L20.788,8.48a1.613,1.613,0,0,1,2.443,1.383V22.769a1.613,1.613,0,0,1-.818,1.4Z" transform="translate(24.382 -9.25) rotate(90)" fill="#fff" />
            </svg>
          </button>
          <div id="break-length">{breakLength}</div>
          <button id="break-decrement" onClick={() => breakLength > 1 ? setBreakLength(breakLength - 1) : setBreakLength(1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16.132" height="13.981" viewBox="0 0 16.132 13.981">
              <path id="Path_4" data-name="Path 4" d="M13.163.209a1.613,1.613,0,0,0-1.625.02L.783,6.683a1.613,1.613,0,0,0,0,2.767L11.538,15.9a1.613,1.613,0,0,0,2.443-1.383V1.613a1.613,1.613,0,0,0-.818-1.4Z" transform="translate(0 13.981) rotate(-90)" fill="#fff" />
            </svg>
          </button>
        </div>
      </div>
      <div className="base-timer">
        <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="Ellipse_1" x="0" y="0" width="270" height="270" filterUnits="userSpaceOnUse">
              <feOffset dx="0" dy="0" input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor="#12152b" floodOpacity="0.161" />
              <feComposite operator="in" in2="blur" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g className="base-timer__circle" filter="url(#Ellipse_1)">
            <path
              id="base-timer-path-remaining"
              strokeDasharray={`${(timeLeft / ((isSession ? sessionLength : breakLength) * 60)) * 282} 282`}
              className="base-timer__path-remaining"
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <span className="base-timer__label">
          <div className="time-left" id="time-left">
            {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
          </div>
          <div id="timer-label">{isSession ? "Session" : "Break"}</div>
        </span>
      </div>

      <div className="buttons">
        <button id="start_stop" onClick={() => setIsStart(!isStart)}>
          <svg fill="none" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg"><g fill="rgb(255,255,255)"><path d="m2.75 12c0-5.10863 4.14137-9.25 9.25-9.25 5.1086 0 9.25 4.14137 9.25 9.25 0 1.1403-.206 2.2308-.5822 3.2375-.1449.388.0521.8201.4401.9651.388.1449.8201-.0521.965-.4401.438-1.172.6771-2.4402.6771-3.7625 0-5.93706-4.8129-10.75-10.75-10.75-5.93706 0-10.75 4.81294-10.75 10.75 0 5.9371 4.81294 10.75 10.75 10.75.5473 0 1.0855-.041 1.6116-.1201.4096-.0616.6917-.4436.6301-.8532-.0617-.4096-.4437-.6917-.8533-.6301-.4524.0681-.9161.1034-1.3884.1034-5.10863 0-9.25-4.1414-9.25-9.25z" /><path d="m16.75 17c0-.4142-.3358-.75-.75-.75s-.75.3358-.75.75v4c0 .4142.3358.75.75.75s.75-.3358.75-.75z" /><path d="m19 16.25c.4142 0 .75.3358.75.75v4c0 .4142-.3358.75-.75.75s-.75-.3358-.75-.75v-4c0-.4142.3358-.75.75-.75z" /><path d="m9.63048 8.34735c.23513-.13313.52372-.12949.75542.00953l5 3.00002c.2259.1355.3641.3797.3641.6431s-.1382.5076-.3641.6431l-5 3c-.2317.139-.52029.1427-.75542.0095-.23514-.1331-.38048-.3824-.38048-.6526v-6c0-.2702.14534-.51952.38048-.65265z" /></g></svg>
        </button>
        <button id="reset" onClick={handleReset}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 303.416 270.216">
            <g id="Group_2" data-name="Group 2" transform="translate(303.416 270.216) rotate(180)" fill="rgb(255,255,255)">
              <path id="Path_1" data-name="Path 1" d="M251.363,135.108A116.256,116.256,0,1,1,26.169,94.418a9.426,9.426,0,1,0-17.66-6.6A134.98,134.98,0,1,0,114.853,1.509a9.426,9.426,0,1,0,2.805,18.642A116.363,116.363,0,0,1,251.363,135.108Z" transform="translate(33.201)" />
              <g id="Group_1" data-name="Group 1" transform="matrix(0.454, 0.891, -0.891, 0.454, 61.591, 59.913)">
                <path id="Path_2" data-name="Path 2" d="M18.852,9.426A9.426,9.426,0,0,0,0,9.426V59.7a9.426,9.426,0,1,0,18.852,0Z" transform="translate(0 0)" />
                <path id="Path_3" data-name="Path 3" d="M9.426,0a9.426,9.426,0,0,1,9.426,9.426V59.7A9.426,9.426,0,1,1,0,59.7V9.426A9.426,9.426,0,0,1,9.426,0Z" transform="translate(69.694 0) rotate(90)" />
              </g>
            </g>
          </svg>
        </button>
      </div>

      <audio preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" id="beep"></audio>
    </div>
  );
}

export default App;
