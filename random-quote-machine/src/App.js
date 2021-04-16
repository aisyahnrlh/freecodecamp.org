import React, { useState, useEffect } from 'react';
import './reset.css';
import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      .then(response => response.json())
      .then(data => {
        setQuotes(data.quotes);
      });

    handleRandomNumber();
  }, []);

  const handleRandomNumber = () => {
    const number = Math.floor((Math.random() * 102) + 1);
    setRandomNumber(number);
  }

  return (
    <div className="quote-box" id="quote-box">
      <h1 id="text">{quotes[randomNumber]?.quote}</h1>
      <p id="author">— {quotes[randomNumber]?.author}</p>
      {/* <a id="tweet-quote"><i class="fab fa-twitter"></i></a> */}
      <div className="buttons">
        <button id="new-quote" onClick={handleRandomNumber}>New Quote</button>
        <a href="https://twitter.com/intent/tweet" id="tweet-quote" target="blank">
          <i class="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  );
}

export default App;
