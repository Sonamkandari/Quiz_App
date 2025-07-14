// converting the jsx file in a component
import React, { useRef, useState } from "react";
//import quiz.css in this Quiz component so that we can style the html structure
import "./Quiz.css";
// importing data array here
import { data } from "../../assets/data";
const Quiz = () => {
  // we will return the state variable
  let [index, setIndex] = useState(0); //zero index means we at the first index
  let [questions, setQuestion] = useState(data[index]); //here we gave the question object here
  // here we are creating a lock state so that we can click only one answer and can lock our answer
  let [lock, setLock] = useState(false);
  // creating a score state
  let [score, setScore] = useState(0);
  // if no of question get finished the quiz Application is getting disappear
  //creating a stage variable to fix it
  let [result, setResult] = useState(false);

  // if we click wrong answer it will highlight correct answer
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  // adding array for these above options
  let option_array = [Option1, Option2, Option3, Option4];

  // now creating functionalities for clicking on option buttons
  //creating arrow function

  const checkAns = (element, ans) => {
    // wrapping this in a in a if condition
    if (lock === false) {
      //if lock==false then execute these condition
      if (questions.ans === ans) {
        element.target.classList.add("Correct");
        setLock(true);
        // whenever the Answer is correct we will increase score by one
        setScore((prev) => prev + 1);
      } else {
        element.target.classList.add("Wrong");
        setLock(true);
        option_array[questions.ans - 1].current.classList.add("Correct");
      }
    }
  };

  // adding functionality for next button

  const next = () => {
    // adding condition when the quiz questions get finished
    if (index === data.length - 1) {
      setResult(true);
      return 0;
    }
    //it means we had chooses an option
    if (lock === true) {
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);

      // to remove previous selections to the next question
      option_array.map((Option) => {
        Option.current.classList.remove("Wrong");
        Option.current.classList.remove("Correct");
        return null;
      });
    }
  };

  // adding functionality for reset button
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {/* Adding a ternary operator for showing the result */}
      {result ? (
        <></>
      ) : (
        <>
          {" "}
          {/*here we are loading questions by using question use state variable  */}
          <h2>
            {index + 1}.{questions.question}
          </h2>
          <ul>
            {/* adding the checkAns function on these options */}
            <li
              ref={Option1}
              onClick={(element) => {
                checkAns(element, 1);
              }}
            >
              {questions.option1}
            </li>
            <li
              ref={Option2}
              onClick={(element) => {
                checkAns(element, 2);
              }}
            >
              {questions.option2}
            </li>
            <li
              ref={Option3}
              onClick={(element) => {
                checkAns(element, 3);
              }}
            >
              {questions.option3}
            </li>
            <li
              ref={Option4}
              onClick={(element) => {
                checkAns(element, 4);
              }}
            >
              {questions.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          {" "}
          {/* for showing the result */}
          <h2>
            your score{score}out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
