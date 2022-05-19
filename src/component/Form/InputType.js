import React, { useState } from "react";
import Button from "../Buttons/";
import TopTitle from "./TopTitle";
import { motion } from "framer-motion";

const InputType = ({ question, submitHandler, handleGoBack }) => {
    const [name, setName] = useState("");

    const onSubmit = () => {
        if (!name || !name.trim()) {
            alert("닉네임을 입력해주세요");
            return;
        }
        submitHandler(name);
    };

    const onGoBack = () => {
        setName("");
        handleGoBack();
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <TopTitle qId={question.qId} qTitle={question.title} />
            <div className="question-container">
                <input type="text" placeholder="닉네임을 입력해주세요" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="question-control">
                <Button onClick={onSubmit} name={"다음"} />
            </div>
        </motion.div>
    );
};

export default InputType;
