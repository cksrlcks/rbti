import React, { useEffect, useState } from "react";
import { sortData } from "../../lib/utill";

const ScoreBoard = ({ rbti }) => {
    const [rank, setLank] = useState(rbti.data);
    useEffect(() => {
        if (rbti.data) {
            setLank((prev) => sortData(rbti.data, "score", "desc"));
        }
    }, [rbti.data]);
    return (
        <div>
            {rank?.map((item, idx) => (
                <div className="score-item" key={idx}>
                    {idx + 1}.{item.rmn_nm} : {item.score}
                </div>
            ))}
        </div>
    );
};

export default ScoreBoard;
