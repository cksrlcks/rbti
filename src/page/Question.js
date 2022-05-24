import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../component/Form/QuestionForm";
import ProgressBar from "../component/ProgressBar";

const Question = ({ question, updateAnswer, deleteAnswer, questionNumber }) => {
    const navigate = useNavigate();

    useEffect(() => {
        //뒤로가기 방지
        const preventGoBack = () => {
            window.history.pushState(null, "", window.location.href);
        };

        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", preventGoBack);

        return () => window.removeEventListener("popstate", preventGoBack);
    }, []);

    useEffect(() => {
        if (!question) {
            navigate("/");
            return;
        }
    }, [question]);

    const handleAnswer = (qid, value) => {
        updateAnswer(qid, value);
    };

    const handleGoBack = () => {
        deleteAnswer(questionNumber);
    };

    return (
        <>
            {question && <ProgressBar stage={questionNumber} max={question.length} />}
            {question && question.map((q) => <QuestionForm key={q.qId} question={q} handleAnswer={handleAnswer} handleGoBack={handleGoBack} questionNumber={questionNumber} />)}
        </>
    );
};

export default Question;
