import React, { useState, useEffect } from "react";
import Button from "../Buttons/";
import TopTitle from "./TopTitle";
import { motion } from "framer-motion";

const OrderType = ({ question, submitHandler, handleGoBack }) => {
    let initialCheckbox = question.answerList.map((item) => ({ ...item, checked: false, disabled: false }));
    const [checkbox, setCheckbox] = useState(initialCheckbox);
    const [value, setValue] = useState([]);
    const [resetVisible, setResetVisible] = useState(false);

    const onInputChange = (e) => {
        const targetValue = e.target.value;
        setValue((prev) => [...prev, e.target.value]);
        setCheckbox((prev) =>
            prev.map((item) => {
                if (item.value === targetValue) {
                    return {
                        ...item,
                        order: value.length + 1,
                        checked: true,
                        disabled: true,
                    };
                }

                return item;
            })
        );
    };

    useEffect(() => {
        initialCheckbox = question.answerList.map((item) => ({ ...item, checked: false, disabled: false }));
        setCheckbox(initialCheckbox);
    }, [question]);

    const handleReset = () => {
        setValue([]);
        setCheckbox((prev) => prev.map((item) => ({ ...item, checked: false, disabled: false, order: null })));
    };

    const onSubmit = () => {
        if (value.length < question.answerList.length) {
            alert("선택해주세요");
            return;
        }
        setValue("");
        submitHandler(value);
    };

    //다시선택하기 보이는 유무
    useEffect(() => {
        if (value.length) {
            setResetVisible(true);
        } else {
            setResetVisible(false);
        }
    }, [value]);

    const onGoBack = () => {
        setValue([]);
        setCheckbox(initialCheckbox);
        handleGoBack();
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <TopTitle qId={question.qId} qTitle={question.title} />
            <div className="guide">가장 선호하는 순서대로 선택해주세요</div>
            <div className="question-container">
                {checkbox.map((item, idx) => (
                    <label key={item.value}>
                        <input
                            type="checkbox"
                            value={item.value}
                            name={`radio-${question.qId}`}
                            onChange={onInputChange}
                            disabled={item.disabled ? true : false}
                            checked={item.checked ? true : false}
                            className="a11y"
                        />
                        <span className="label">
                            {item.label}
                            {item.order && <i className="num">{item.order}</i>}
                        </span>
                    </label>
                ))}
            </div>
            <div className="question-control">
                {resetVisible && <Button onClick={handleReset} name={"다시 선택하기"} className={"reset"} />}
                <Button onClick={onGoBack} name={"이전"} className={"prev"} />
                <Button onClick={onSubmit} name={"다음"} />
            </div>
        </motion.div>
    );
};

export default OrderType;
