/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css';
import Buttons from './Buttons';
import { numbers } from './data';

function App() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAnswer, setIsAnswer] = useState(false);
  const [isDecimal, setIsDecimal] = useState(true);

  const split = input.split(/ /g);
  const replace = input.replace(/ /g, '');
  const splitLength = input.split(/ /g).length;
  const handleSplit = split[splitLength - 1];

  const isOperation = /[*/+-]/;
  const isNumber = /[0-9]/;

  // NOTES
  // input = string
  // answer = number
  useEffect(() => {
    if (replace.match(/[*/+-]{3,}/)) {
      setInput(replace.substring(0, replace.length - 3) + " " + replace[replace.length - 1] + " ");
    }
  }, [replace])

  const handleInput = (number) => {
    // set input
    if (!replace.match(/[*/+-]{3,}/)) {
      if (number.match(isOperation)) {
        setInput(input + ` ${number} `);
        setIsDecimal(true);
      } else if (number.match(/[.]/)) {
        setInput(input + number);
        setIsDecimal(false);
      } else {
        setInput(input + number);
      }
    }

    // if there are '0' consequtively
    if (number === '0' && input.length === 0) {
      setInput("");
    }

    // if already click equals and want to input new operator
    if (isAnswer && number.match(isOperation)) {
      setInput(split[splitLength - 1] + " " + number + " ");
      setIsAnswer(false);
    }

    // if already click equals and want to input new number
    if (isAnswer && number.match(isNumber)) {
      setInput(number);
      setIsAnswer(false);
    }
  }

  const handleAnswer = () => {
    let answer = evaluate(input);
    const answerStr = answer.toString().split('.');
    if (answerStr[1] > 5) {
      answer = answer.toFixed(5);
    }
    setAnswer(answer);
    setInput(input + ' = ' + answer.toString())
    setIsAnswer(true);
  }

  const handleClear = () => {
    setInput("");
    setAnswer("");
    setIsAnswer(false);
    setIsDecimal(true);
  }

  const handleDelete = () => {
    if (input.length <= 1) {
      setInput("");
      setAnswer("");
      setIsAnswer(false);
    }
    setInput(input.substring(0, input.length - 1));
  }

  console.log(input)

  return (
    <div className="App">
      <div className="display">
        {input.length !== 0 && input.replace(/ /g, '')}
        <div id="display">
          {
            isAnswer
              ? `${answer}`
              : input.length !== 0
                ? handleSplit === ''
                  ? split[splitLength - 2]
                  : handleSplit
                : "0"
          }
        </div>
      </div>
      <div className="calculator">
        {
          numbers.map(number => {
            const { value } = number;
            return <Buttons {...number} onClick={() => handleInput(value)} />
          })
        }

        <button id="last-clear" onClick={handleDelete}>C</button>
        <button id="clear" onClick={handleClear}>CE</button>
        <button id="decimal" onClick={() => handleInput('.')} disabled={isDecimal === false}>.</button>
        <button id="equals" onClick={handleAnswer}>=</button>
      </div>
    </div>
  );
}

export default App;
