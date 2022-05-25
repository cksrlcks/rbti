import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CircleProgressBar from "../component/ProgressCircle";
import styled from "styled-components";
import { sortData, stringToArray } from "../lib/utill";

const Loading = ({ rbti, answer, score }) => {
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
        if (!location.state) {
            alert("설문을 위해 처음으로 돌아갑니다.");
            navigate("/");
            return;
        }

        const pickRmn = score.slice(0, 5);

        //끌리는 라면의 공통점찾기
        const evalAttrRmn = (seqArray) => {
            let tags = [];

            seqArray.forEach((seq) => {
                rbti.originRmnData.forEach((ormn) => {
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
                    rbti.originRmnData.forEach((ormn) => {
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

        const attrRmn = evalAttrRmn(answer[14].value);

        //나의라면으로 뽑힌 아이템의 현재인기순위
        const bestRmnRnk = sortData(rbti.originRmnData, "sellNum", "desc").findIndex((item) => item.rmn_seq == pickRmn[0].rmn_seq);

        const sendData = {
            gender: answer[1].value,
            age: answer[2].value,
            frequency: answer[3].value,
            quantity: answer[4].value,

            //결과페이지 필요한 값들

            //이름
            name: answer[0].value,

            //선택된5개라면
            pickRmn: pickRmn,

            //나의라면으로 뽑힌 아이템의 현재인기순위
            bestRmnRnk: bestRmnRnk,

            //끌리는라면3개중 공통태그가 가장많은 라면1개
            attrRmn: attrRmn,

            //질문응답결과들
            answer: answer,
        };

        //서버로 보냄 - 응답에 해당 데이터 다시받을수있는 id부여받아서 공유하기버튼에 주소 붙여야함
        //끝에 id패러미터 붙여서 들어오면 결과페이지 다시 계산해주기
        console.log("서버로 보낼 응답데이터", sendData);

        setResult(sendData);

        setTimeout(() => {
            navigate("/result", { state: sendData });
        }, 3000);
    }, [score, rbti, answer]);

    return (
        <LoadingBox>
            <CircleProgressBar trailStrokeColor="gray" strokeColor="teal" percentage={100} speed={4} innerText="complete" />
            잠시만 기다려주세요
            <br /> {`${answer[0].value}님의`} 라면박스를 조립중입니다
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
