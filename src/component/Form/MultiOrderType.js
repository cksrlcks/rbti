import React, { useEffect, useState } from "react";
import Button from "../Buttons/";

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
        if (value.length < question.max) {
            alert("선택해주세요");
            return;
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
        <>
            <div className="guide">
                가장 선호하는 순서대로 <span className="num">{question.max}가지</span> 선택해주세요
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
        </>
    );
};

export default OrderType;
