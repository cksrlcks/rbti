import React, { useState } from "react";
import Button from "../Buttons/";
import TopTitle from "./TopTitle";
import { motion } from "framer-motion";

const RadioType = ({ question, submitHandler, handleGoBack }) => {
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

    const onGoBack = () => {
        setValue("");
        handleGoBack();
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <TopTitle qId={question.qId} qTitle={question.title} />
            <div className="question-container">
                {question.answerList.map((item, idx) => (
                    <label key={item.value}>
                        <input type="radio" name={`radio-${question.qId}`} value={item.value} onChange={onInputChange} checked={value === item.value} className="a11y" />
                        <motion.span className="label" whileTap={{ scale: 0.99 }}>
                            {item.label}
                        </motion.span>
                    </label>
                ))}
            </div>
            <div className="question-control">
                <Button onClick={onGoBack} name={"이전"} className={"prev"} />
                <Button onClick={onSubmit} name={"다음"} />
            </div>
        </motion.div>
    );
};

export default RadioType;
