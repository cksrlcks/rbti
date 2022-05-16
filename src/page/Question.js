import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionForm from "../component/Question";
import { rmnQuestion } from "../data/question";

const Question = ({ rbti, questionList, updateAnswer }) => {
    const navigate = useNavigate();
    const [questionNumber, setQuestionNumber] = useState(1);
    const handleAnswer = (qid, value) => {
        updateAnswer(qid, value);

        if (questionNumber > questionList.length - 1) {
            navigate("/result");
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

    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, []);

    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = "";

        navigate("/");
        return false;
    };

    return <QuestionForm questionNumber={questionNumber} handleAnswer={handleAnswer} handleGoBack={handleGoBack} />;
};

export default Question;
