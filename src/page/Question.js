import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../component/Form/QuestionForm";
import ProgressBar from "../component/ProgressBar";

const Question = ({ questionList, updateAnswer, userCount }) => {
    const navigate = useNavigate();
    const [questionNumber, setQuestionNumber] = useState(1);
    const [question, setQuestion] = useState(questionList);

    useEffect(() => {
        //뒤로가기 방지
        const preventGoBack = () => {
            window.history.pushState(null, "", window.location.href);
        };

        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", preventGoBack);

        return () => window.removeEventListener("popstate", preventGoBack);
    }, []);

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
        if (questionNumber - 1 < 1) {
            setQuestionNumber((prev) => 1);
        } else {
            setQuestionNumber((prev) => prev - 1);
        }
    };

    return (
        <>
            <ProgressBar stage={questionNumber} max={question.length} />
            {question.map((q) => (
                <QuestionForm key={q.qId} question={q} handleAnswer={handleAnswer} handleGoBack={handleGoBack} questionNumber={questionNumber} />
            ))}
        </>
    );
};

export default Question;
