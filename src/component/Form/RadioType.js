import React, { useState } from "react";
import Button from "../Buttons/";

const RadioType = ({ question, questionNumber, submitHandler, handleGoBack }) => {
    const [value, setValue] = useState("");

    const onInputChange = (e) => {
        setValue(e.target.value);
    };

    const onSubmit = () => {
        if (!value.length) {
            alert("선택해주세요");
            return;
        }
        setValue("");
        submitHandler(question.qId, value);
    };

    const onGoBack = () => {
        setValue("");
        handleGoBack();
    };

    return (
        <>
            <div className="question-container">
                {question.answerList.map((item, idx) => (
                    <label key={item.value}>
                        <input type="radio" name={`radio-${questionNumber}`} value={item.value} onChange={onInputChange} checked={value === item.value} className="a11y" />
                        <span className="label">{item.label}</span>
                    </label>
                ))}
            </div>
            <div className="question-control">
                <Button onClick={onGoBack} name={"이전"} className={"prev"} />
                <Button onClick={onSubmit} name={"다음"} />
            </div>
        </>
    );
};

export default RadioType;
