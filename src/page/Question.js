import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../component/Form/QuestionForm";
import Intro from "../component/Intro";
import useBackListener from "../hooks/useBackListener";

const Question = ({ questionList, updateAnswer, userCount }) => {
    const navigate = useNavigate();
    const [questionNumber, setQuestionNumber] = useState(1);
    const [question, setQuestion] = useState(questionList.find((q) => q.qId == questionNumber));

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

    useEffect(() => {
        setQuestion((prev) => questionList.find((q) => q.qId == questionNumber));
    }, [questionNumber]);

    const handleGoBack = () => {
        if (questionNumber - 1 < 1) {
            setQuestionNumber((prev) => 1);
        } else {
            setQuestionNumber((prev) => prev - 1);
        }
    };

    useBackListener(() => {
        //뒤로가기시 브라우저의 뒤로가기 가로채기
        // handleGoBack();
    });

    return <QuestionForm question={question} handleAnswer={handleAnswer} handleGoBack={handleGoBack} />;
};

export default Question;
