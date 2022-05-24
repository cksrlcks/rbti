import React, { useEffect, useState } from "react";
import { sortData } from "../../lib/utill";

const ScoreBoard = ({ score }) => {
    return (
        <div>
            {score.map((item, idx) => (
                <div className="score-item" key={item.rmn_seq}>
                    {idx + 1}.{item.rmn_nm} : {item.score}
                </div>
            ))}
        </div>
    );
};

export default ScoreBoard;
