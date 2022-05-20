import React, { useState, useEffect } from "react";
import styled from "styled-components";
const INITIAL_OFFSET = 25;
const circleConfig = {
    viewBox: "0 0 38 38",
    x: "19",
    y: "19",
    radio: "15.91549430918954",
};

const CircleProgress = ({ percentage, speed }) => {
    const [progressBar, setProgressBar] = useState(0);
    const pace = percentage / speed;
    const updatePercentage = () => {
        setTimeout(() => {
            setProgressBar(progressBar + 1);
        }, pace);
    };

    useEffect(() => {
        if (percentage > 0) updatePercentage();
    }, [percentage]);

    useEffect(() => {
        if (progressBar < percentage) updatePercentage();
    }, [progressBar]);

    return (
        <CircleProgressBar>
            <svg viewBox={circleConfig.viewBox}>
                <circle className="donut-ring" cx={circleConfig.x} cy={circleConfig.y} r={circleConfig.radio} fill="transparent" />

                <circle
                    className="donut-segment"
                    cx={circleConfig.x}
                    cy={circleConfig.y}
                    r={circleConfig.radio}
                    fill="transparent"
                    strokeDasharray={`${progressBar} ${100 - progressBar}`}
                    strokeDashoffset={INITIAL_OFFSET}
                />
            </svg>
            <div className="chart-text">{progressBar}%</div>
        </CircleProgressBar>
    );
};

export default CircleProgress;

const CircleProgressBar = styled.div`
    width: 120px;
    height: 120px;
    position: relative;
    margin-bottom: 30px;
    .chart-text {
        fill: #000;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .chart-number {
        font-size: 0.6em;
        line-height: 1;
        text-anchor: middle;
    }
    .donut-segment {
        stroke: ${(props) => props.theme.primaryColor};
        stroke-width: 3px;
    }
    .donut-ring {
        stroke: #eee;
        stroke-width: 3px;
    }
`;
