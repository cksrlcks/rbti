import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sortJSON } from "../lib/utill";
const Result = ({ rbti, answer }) => {
    const navigate = useNavigate();
    const [result, setResult] = useState("");
    const [prize, setPrizeList] = useState([]);

    useEffect(() => {
        setResult((prev) => {
            const newResult = rbti.result(answer);
            return newResult;
        });
    }, []);

    useEffect(() => {
        if (result) {
            const prizeList = sortJSON(result.data, "score", "desc");
            setPrizeList(prizeList);
            console.log(prizeList);
        }
    }, [result]);

    return (
        <div>
            <div>선택된 라면 best5</div>
            {prize &&
                prize.map((item, idx) => {
                    if (idx < 6) {
                        return (
                            <div key={item.rmn_seq}>
                                {item.rmn_nm} : {item.score}
                            </div>
                        );
                    }
                })}
            <br />
            <br />
            <div>응답결과</div>
            {result &&
                result.answer.map((item) => (
                    <div key={item.qid}>
                        {item.qid} : {item.value?.toString()}
                    </div>
                ))}
            <br />
            <br />
            <div>라면순위점수표</div>
            {prize &&
                prize.map((item, idx) => (
                    <div key={item.rmn_seq}>
                        {item.rmn_nm} : {item.score}
                        <br />({item.rmn_tag})
                    </div>
                ))}
        </div>
    );
};

export default Result;
