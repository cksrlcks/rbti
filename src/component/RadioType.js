import React, { useEffect, useState } from "react";

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
        submitHandler(value);
    };
    return (
        <>
            {question.answerList.map((item, idx) => (
                <div key={item.value}>
                    <label>
                        <input type="radio" name={`radio-${questionNumber}`} value={item.value} onChange={onInputChange} checked={value === item.value} />
                        <span className="label">{item.label}</span>
                    </label>
                </div>
            ))}
            <button type="button" onClick={() => handleGoBack()}>
                이전
            </button>
            <button type="button" onClick={() => onSubmit()}>
                다음
            </button>
        </>
    );
};

export default RadioType;
