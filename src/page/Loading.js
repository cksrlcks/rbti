import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import qs from "qs";
import ormnData from "../data/ormnData";
import { stringToArray } from "../lib/utill";

const Loading = ({ answer, rbti }) => {
    const [result, setResult] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let stringified;
        for (let i = 0; i < answer.length; i++) {
            if (!answer[i].value) {
                alert("설문을 위해 처음으로 돌아갑니다.");
                navigate("/question");
                break;
            }
        }

        //rbti클래스에서 응답결과로 평가시작
        const evalValues = rbti.result(answer);

        //서버로 보내서 평가받아옴 (axios요청구간, 일단 임시로 3초후)
        console.log("서버로 보낼 응답데이터", evalValues);
        setTimeout(() => {
            //질문응답+서버응답 가지고 result state 업데이트
            setResult((prev) => {
                //결과공유하기할때, state상태 url에 가져갈필요가 잇어서 qs라이브러리 이용함
                stringified = qs.stringify(evalValues);
                return evalValues;
            });
            navigate(`/result?${stringified}`);
        }, 3000);
    }, []);

    return (
        <LoadingBox>
            잠시만 기다려주세요
            <br /> {answer[0].value && `${answer[0].value}님의`} 라면박스를 조립중입니다
            <br />
            <br /> (서버로 설문데이터꾸러미 보내고, 다시 데이터 받아야됩니다. <br /> 결과화면은 임시 데이터꾸러미로 랜더링합니다, 3초후 랜더링)
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
`;
