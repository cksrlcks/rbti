import React, { useEffect, useState } from "react";
import InputType from "./InputType";
import OrderType from "./OrderType";
import RadioType from "./RadioType";
import MultiOrderType from "./MultiOrderType";
import MultiType from "./MultiType";
import { useNavigate } from "react-router-dom";
import { rmnQuestion } from "../data/question";
import RmnMulti from "./RmnMulti";

const Question = ({ questionNumber, handleAnswer, handleGoBack }) => {
    const [question, setQuestion] = useState(rmnQuestion[questionNumber - 1]);
    useEffect(() => {
        setQuestion(rmnQuestion[questionNumber - 1]);
    }, [questionNumber]);
    const submitHandler = (data) => {
        handleAnswer(questionNumber, data);
    };

    return (
        <div>
            {question && (
                <>
                    <div>Q.{questionNumber}</div>
                    <div>{question.title}</div>
                    {question.qType == "input" && <InputType questionNumber={questionNumber} question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />}
                    {question.qType == "radio" && <RadioType questionNumber={questionNumber} question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />}
                    {question.qType == "order" && <OrderType questionNumber={questionNumber} question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />}
                    {question.qType == "multiOrder" && (
                        <MultiOrderType questionNumber={questionNumber} question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />
                    )}
                    {question.qType == "multi" && <MultiType questionNumber={questionNumber} question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />}
                    {question.qType == "rmn_mulit" && <RmnMulti questionNumber={questionNumber} question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />}
                </>
            )}
        </div>
    );
};

export default Question;
