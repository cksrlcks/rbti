import React, { useState } from "react";
import Button from "../Buttons/";

const InputType = ({ question, submitHandler, handleGoBack }) => {
    const [name, setName] = useState("");

    const onSubmit = () => {
        if (!name || !name.trim()) {
            alert("닉네임을 입력해주세요");
            return;
        }
        submitHandler(question.qId, name);
    };

    const onGoBack = () => {
        setName("");
        handleGoBack();
    };

    return (
        <>
            <div className="question-container">
                <input type="text" placeholder="닉네임을 입력해주세요" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="question-control">
                <Button onClick={onGoBack} name={"이전"} className={"prev"} />
                <Button onClick={onSubmit} name={"다음"} />
            </div>
        </>
    );
};

export default InputType;
