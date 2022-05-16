import React, { useState } from "react";

const OrderType = ({ question, questionNumber, submitHandler, handleGoBack }) => {
    const initialCheckbox = question.answerList.map((item) => ({ ...item, checked: false, disabled: false }));
    const [checkbox, setCheckbox] = useState(initialCheckbox);
    const [value, setValue] = useState([]);

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
    return (
        <>
            {checkbox.map((item, idx) => (
                <div key={item.value}>
                    <label>
                        <input
                            type="checkbox"
                            value={item.value}
                            name={`radio-${questionNumber}`}
                            onChange={onInputChange}
                            disabled={item.disabled ? true : false}
                            checked={item.checked ? true : false}
                        />
                        <span className="label">
                            {item.label}
                            {item.order && item.order}
                        </span>
                    </label>
                </div>
            ))}
            <button type="button" onClick={handleReset}>
                다시 선택하기
            </button>
            <button type="button" onClick={() => handleGoBack()}>
                이전
            </button>
            <button type="button" onClick={() => onSubmit()}>
                다음
            </button>
        </>
    );
};

export default OrderType;
