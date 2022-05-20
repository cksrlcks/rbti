import React, { useState, useEffect } from "react";

const INITIAL_OFFSET = 25;
const circleConfig = {
    viewBox: "0 0 38 38",
    x: "19",
    y: "19",
    radio: "15.91549430918954",
};

const CircleProgressBarBase = ({ percentage, speed }) => {
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
        <figure>
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
        </figure>
    );
};

export default CircleProgressBarBase;
