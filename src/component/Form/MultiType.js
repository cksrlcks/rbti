import React, { useEffect, useState } from "react";
import Button from "../Buttons/";
import TopTitle from "./TopTitle";
import { motion } from "framer-motion";

const MultiType = ({ question, submitHandler, handleGoBack }) => {
    let initialCheckbox = question.answerList.map((item) => ({ ...item, checked: false, disabled: false }));
    const [checkbox, setCheckbox] = useState(initialCheckbox);
    const [value, setValue] = useState([]);
    const [resetVisible, setResetVisible] = useState(false);

    const onInputChange = (e) => {
        const targetValue = e.target.value;
        if (targetValue == "없어요" || targetValue == "안 먹어요") {
            setValue((prev) => [targetValue]);
            setCheckbox((prev) =>
                prev.map((item) => {
                    if (item.value == "없어요" || item.value == "안 먹어요") {
                        return {
                            ...item,
                            order: null,
                            disabled: true,
                            checked: true,
                        };
                    } else {
                        return {
                            ...item,
                            order: null,
                            disabled: true,
                            checked: false,
                        };
                    }
                })
            );
        } else {
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
        }
    };

    useEffect(() => {
        initialCheckbox = question.answerList.map((item) => ({ ...item, checked: false, disabled: false }));
        setCheckbox(initialCheckbox);
    }, [question]);

    useEffect(() => {
        if (value.length > question.max - 1) {
            setCheckbox((prev) =>
                prev.map((item) => ({
                    ...item,
                    disabled: true,
                }))
            );

            return;
        }
    }, [value]);

    const handleReset = () => {
        setValue([]);
        setCheckbox((prev) => prev.map((item) => ({ ...item, checked: false, disabled: false, order: null })));
    };

    const onSubmit = () => {
        if (!value.includes("없어요") && !value.includes("안 먹어요")) {
            if (value.length < question.max) {
                alert("선택해주세요");
                return;
            }
        }

        setValue("");
        setCheckbox((prev) => initialCheckbox);
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
            <div className="guide">
                최대 <span className="num">{question.max}개</span> 선택하실 수 있어요
            </div>
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
                        <motion.span className="label" whileTap={{ scale: 0.99 }}>
                            {item.label}
                            {item.order && (
                                <motion.i className="num" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                    {item.order}
                                </motion.i>
                            )}
                        </motion.span>
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

export default MultiType;
