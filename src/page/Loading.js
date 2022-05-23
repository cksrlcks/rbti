import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CircleProgressBar from "../component/ProgressCircle";
import styled from "styled-components";
import qs from "qs";
import { sortData, stringToArray } from "../lib/utill";

const Loading = ({ rbti, answer, data, originData, question }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [result, setResult] = useState("");

    useEffect(() => {
        //뒤로가기 방지
        const preventGoBack = () => {
            window.history.pushState(null, "", window.location.href);
        };

        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", preventGoBack);

        return () => window.removeEventListener("popstate", preventGoBack);
    }, []);

    useEffect(() => {
        let stringified;
        if (!location.state) {
            alert("설문을 위해 처음으로 돌아갑니다.");
            navigate("/");
            return;
        }

        const bestRmn = data.map((item, idx) => item.rmn_seq).slice(0, 5);
        console.log(bestRmn);
        const bestRmnRank = sortData(originData, "sellNum", "desc").find((item) => item.rmn_seq == bestRmn[0]).sellNum;

        const otherFvRmn = sortData(originData, "fvNum", "desc")
            .map((item, idx) => item.rmn_seq)
            .slice(0, 4);

        //끌리는 라면의 공통점찾기
        const evalAttrRmn = (seqArray) => {
            let tags = [];

            seqArray.forEach((seq) => {
                originData.forEach((ormn) => {
                    if (seq == ormn.rmn_seq) {
                        let selectedTags = stringToArray(ormn.rmn_tag);
                        tags = [...tags, ...selectedTags];
                    }
                });
            });

            //tags배열 중복제거
            let newTags = new Set(tags);

            //seqArray에 점수주기
            const list = seqArray.map((seq) => {
                let score = 0;
                newTags.forEach((tag) => {
                    originData.forEach((ormn) => {
                        if (ormn.rmn_seq == seq && ormn.rmn_tag.includes(tag)) {
                            score++;
                        }
                    });
                });

                return {
                    rmn_seq: seq,
                    score: score,
                };
            });

            //score제일 큰 항목 찾기
            const max = list.reduce(function (prev, current) {
                return prev.score > current.score ? prev : current;
            });

            return max.rmn_seq;
        };
        console.log(answer);
        const attrRmn = evalAttrRmn(answer[15]);

        const resultSet = {
            answer: answer,
            bestRmn: bestRmn,
            bestRmnRank: bestRmnRank,
            attrRmn: attrRmn,
            otherFvRmn: otherFvRmn,
        };

        //서버로 보냄(axios요청구간)
        console.log("서버로 보낼 응답데이터", resultSet);
        stringified = qs.stringify(resultSet);

        setTimeout(() => {
            //settimeout안에서 resultSet은 이전 state를 기억하고 잇어서 밖으로 빼야한다
            //stringified = qs.stringify(resultSet);
            if (!stringified) {
                navigate("/");
            }

            navigate(`/result?${stringified}`);
        }, 3000);
    }, []);

    return (
        <LoadingBox>
            <CircleProgressBar trailStrokeColor="gray" strokeColor="teal" percentage={100} speed={4} innerText="complete" />
            잠시만 기다려주세요
            <br /> {`${answer[1]}님의`} 라면박스를 조립중입니다
        </LoadingBox>
    );
};

export default Loading;

const LoadingBox = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    line-height: 1.4;
    color: #000;
    font-weight: 700;
    font-size: 24px;
`;
