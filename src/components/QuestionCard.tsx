import React from 'react';
//Types 
import {AnswerObject} from '../App';
//Styles
import {Wrapper, ButtonWrapper } from './QuestionCard.styles'
type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}
//The React.FC<Props> is for functional components
const QuestionCard:React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions
}) => (
    <div className="wrapper">
    <p className="number">
        Question: {questionNumber} / {totalQuestions}
    </p>

    <p dangerouslySetInnerHTML= {{__html:question}}/>
    <div>
        {answers.map(answer => (
            <div className="button-wrapper"
             key={answer} >
                <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html: answer}}/>
                </button>
                </div>
        ))}
    </div>
    </div>
);


export default QuestionCard;