import React, {useState} from 'react';
import '../src/App.css'
import {fetchQuizQuestions} from './components/API';
//Components
import QuestionCard from '../src/components/QuestionCard';
//Types
import {QuestionState,Difficulty} from './components/API';

import { GlobalStyle} from './App.styles'

export type AnswerObject = {
  questions: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const TOTAL_QUESTIONS = 10;

  // console.log(questions)
  const startQuiz = async () =>{
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    try {
      setQuestions(newQuestions);
    } catch (error) {
      console.log(error)
    }
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      //User answer
      const answer = e.currentTarget.value;
      //Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //Add score if answer is correct 
      if(correct) setScore(prev => prev + 1);
      //Save the answer in the  array of user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject]as any)
    }
  }

  const nextQuestion = () => {
    //Move on to the next question if not on the last
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }else{
      setNumber(nextQuestion);
    }
  }
  return (
    <>
    <GlobalStyle/>
    <div className="App">
      <h1>REACT QUIZ APP</h1>
      {questions || userAnswers.length === TOTAL_QUESTIONS ? (
         <button className="start" onClick={startQuiz}>
        Start 
      </button>
      ) : null}
     
     {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading Questions. . .</p>}
      {!loading && !gameOver && (
          <QuestionCard
      questionNumber={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers ? userAnswers[number]: undefined}
      callback={checkAnswer}
      />
      )}
    {!gameOver && !loading &&
     userAnswers.length === number + 1 
    && number !== TOTAL_QUESTIONS - 1 ? 
    ( <button className="next" 
    onClick={nextQuestion}>
        Next Question
      </button>
    ) : null}
    { number === TOTAL_QUESTIONS - 1 ?(
                      <h1 className="game-over">QUIZ OVER</h1>
    ): null}
    
       </div>
       </>
  );
}

export default App;
