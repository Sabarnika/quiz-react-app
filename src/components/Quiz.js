import React, { useEffect, useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../assests/data";
function Quiz() {
  let [index, setIndex] = useState(0);
  let [qn, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [res, setRes] = useState(false);
  let [timer, setTimer] = useState(3);
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let timeid;
  let option_arr = [option1, option2, option3, option4];
  const checkAns = (e, ans) => {
    if (lock === false) {
      if (qn.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_arr[qn.ans - 1].current.classList.add("correct");
        clearTimeout(timeid);
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setRes(true);
      }
    }
    setIndex(++index);
    setQuestion(data[index]);
    setLock(false);
    option_arr.map((option) => {
      option.current.classList.remove("wrong");
      option.current.classList.remove("correct");
    });
    setTimer(3);
  };
  const reset = () => {
    setIndex(0);
    setLock(false);
    setScore(0);
    setQuestion(data[0]);
    setRes(false);
    setTimer(3);
  };
  useEffect(() => {
    if (timer > 0 && !lock) {
      timeid = setTimeout(() => {
        setTimer((prevtime) => prevtime - 1);
        if (timer === 1) {
          next();
        }
      }, 1000);
    }
    return () => clearTimeout(timeid);
  }, [timer, lock]);
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {res ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {qn.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {qn.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {qn.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {qn.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {qn.option4}
            </li>
          </ul>
          <p>Time Remaining : 0{timer}</p>
          <button onClick={next}>Next</button>
          <div className="out-of">
            {index + 1} out of {data.length} questions
          </div>
        </>
      )}
      {res ? (
        <>
          <h2>
            You scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>RESET</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Quiz;
