import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styledComponents from "styled-components";
import QuestionForm from "../component/Form/QuestionForm";
import ProgressBar from "../component/ProgressBar";

const Question = ({ updateAnswer, rbti, setDone }) => {
    const navigate = useNavigate();
    const [questionNumber, setQuestionNumber] = useState(1);
    const [question, setQuestion] = useState(rbti.questionList);

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

    useEffect(() => {
        if (questionNumber == 0) {
            rbti.reset();
        }
    }, [questionNumber]);

    const handleAnswer = (qid, value) => {
        updateAnswer(qid, value);

        if (questionNumber > question.length - 1) {
            navigate("/loading", { state: { done: true } });
            return;
        } else {
            setQuestionNumber((prev) => prev + 1);
        }
    };

    const handleGoBack = () => {
        if (questionNumber - 1 < 1) {
            setQuestionNumber((prev) => 1);
        } else {
            setQuestionNumber((prev) => prev - 1);
        }
    };

    return (
        <>
            {question && <ProgressBar stage={questionNumber} max={question.length} />}
            {question && question.map((q) => <QuestionForm key={q.qId} question={q} handleAnswer={handleAnswer} handleGoBack={handleGoBack} questionNumber={questionNumber} />)}
        </>
    );
};

export default Question;
