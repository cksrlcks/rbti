import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CircleProgressBar from "../component/ProgressCircle";
import styled from "styled-components";
import qs from "qs";

const Loading = ({ answer, rbti }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let stringified;
        if (!location.state) {
            alert("설문을 위해 처음으로 돌아갑니다.");
            navigate("/");
            return;
        }

        //rbti클래스에서 응답결과로 평가시작
        const evalValues = rbti.result();

        //서버로 보내서 평가받아옴 (axios요청구간)
        console.log("서버로 보낼 응답데이터", evalValues);

        setTimeout(() => {
            stringified = qs.stringify(evalValues);
            if (!stringified) {
                navigate("/");
            }

            navigate(`/result?${stringified}`);
        }, 3000);
    }, [answer]);

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
