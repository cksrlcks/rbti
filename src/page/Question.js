import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../component/Form/QuestionForm";
import Intro from "../component/Intro";

const Question = ({ questionList, updateAnswer, userCount }) => {
    const navigate = useNavigate();
    const [questionNumber, setQuestionNumber] = useState(0);
    const handleAnswer = (qid, value) => {
        updateAnswer(qid, value);

        if (questionNumber > questionList.length - 1) {
            navigate("/loading");
            return;
        } else {
            setQuestionNumber((prev) => prev + 1);
        }
    };

    const handleGoBack = () => {
        if (questionNumber == 1) {
            navigate("/");
        } else {
            setQuestionNumber((prev) => prev - 1);
        }
    };

    if (questionNumber == 0) {
        return <Intro setQuestionNumber={setQuestionNumber} userCount={userCount} />;
    }
    return <QuestionForm questionNumber={questionNumber} handleAnswer={handleAnswer} handleGoBack={handleGoBack} />;
};

export default Question;
