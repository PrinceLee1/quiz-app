import React from 'react';

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
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
    <div>
    <p className="number">
        Question: {questionNumber} / {totalQuestions}
    </p>

    <p dangerouslySetInnerHTML= {{__html:question}}/>
    <div>
        {answers.map(answer => (
            <div>
                <button disabled={userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html: answer}}/>
                </button>
                </div>
        ))}
    </div>
    </div>
);


export default QuestionCard;