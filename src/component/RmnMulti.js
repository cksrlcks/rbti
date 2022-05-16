import React, { useEffect, useState } from "react";

const RmnMulti = ({ question, questionNumber, submitHandler, handleGoBack }) => {
    let initialCheckbox = question.answerList.map((item) => ({ ...item, checked: false, disabled: false }));
    const [checkbox, setCheckbox] = useState(initialCheckbox);
    const [value, setValue] = useState([]);
    const onInputChange = (e) => {
        const targetValue = e.target.value;
        setValue((prev) => [...prev, e.target.value]);
        setCheckbox((prev) =>
            prev.map((item) => {
                if (item.rmn_seq == targetValue) {
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

    useEffect(() => {
        initialCheckbox = question.answerList.map((item) => ({ ...item, checked: false, disabled: false }));
        setCheckbox(initialCheckbox);
    }, [question]);

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
    return (
        <>
            {checkbox.map((item, idx) => (
                <div key={idx}>
                    <label>
                        <input
                            type="checkbox"
                            value={item.rmn_seq}
                            name={`radio-${questionNumber}`}
                            onChange={onInputChange}
                            disabled={item.disabled ? true : false}
                            checked={item.checked ? true : false}
                        />
                        <span className="label">
                            {item.rmn_nm}
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

export default RmnMulti;
