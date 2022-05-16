import React, { useState } from "react";

const InputType = ({ submitHandler, handleGoBack }) => {
    const [name, setName] = useState("");

    const onSubmit = () => {
        if (!name || !name.trim()) {
            alert("닉네임을 입력해주세요");
            return;
        }
        submitHandler(name);
    };
    return (
        <>
            <div>
                <input type="text" placeholder="닉네임을 입력해주세요" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <button type="button" onClick={() => handleGoBack()}>
                이전
            </button>
            <button type="button" onClick={() => onSubmit()}>
                다음
            </button>
        </>
    );
};

export default InputType;
