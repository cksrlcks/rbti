import React from "react";
import styled from "styled-components";

const ProgressBar = ({ stage, max }) => {
    const percentage = (stage / max) * 100;
    return (
        <>
            <Bar percentage={percentage}>
                <div className="bar"></div>
            </Bar>
            <Counter>
                {stage} / {max}
            </Counter>
        </>
    );
};

export default ProgressBar;

const Bar = styled.div`
    width: 100%;
    height: 10px;
    background: #eee;
    margin-bottom: 1em;

    .bar {
        height: 100%;
        background: ${(props) => props.theme.primaryColor};
        width: ${(props) => props.percentage}%;
    }
`;

const Counter = styled.div`
    text-align: right;
    color: #000;
    font-size: 14px;
`;
