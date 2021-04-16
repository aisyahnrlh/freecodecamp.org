import React, { useEffect } from 'react';
import './App.css';
import { useGlobalContext } from './context';

function Drumpad({ keyCode, id, keyTrigger, url, power, volume }) {
    const { setDisplay } = useGlobalContext();
    const playAudio = () => {
        const audio = document.getElementById(keyTrigger);
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play();
        setDisplay(id);
    }

    const handleKeyboard = (e) => {
        if (e.keyCode === keyCode && power) {
            playAudio();
        }
    }

    useEffect(() => {
        const element = document.getElementById(id);
        if (power) {
            element.addEventListener('click', playAudio);
        }
        window.addEventListener('keydown', handleKeyboard);
        return () => {
            window.removeEventListener('keydown', handleKeyboard);
            element.removeEventListener('click', playAudio);
        };
    });

    return (
        <div className="drum-pad" id={id}>
            <audio src={url} className="clip" id={keyTrigger}></audio>
            {keyTrigger}
        </div>
    )
}

export default Drumpad
