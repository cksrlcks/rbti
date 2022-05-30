import React, { useEffect, useState } from "react";
import { sortData } from "../../lib/utill";

const ScoreBoard = ({ score }) => {
	console.log(score)
    return (
        <div>
            {score.map((item, idx) => (
                <div className="score-item" key={idx}>
                    {idx + 1}.{item.rmnNm} : {item.score}
                </div>
            ))}
        </div>
    );
};

export default ScoreBoard;
