import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
        const evalValues = rbti.result(
            Object.keys(answer).map((key) => ({
                qid: +key,
                value: answer[key],
            }))
        );

        //서버로 보내서 평가받아옴 (axios요청구간, 일단 임시로 3초후)
        console.log("서버로 보낼 응답데이터", evalValues);

        setTimeout(() => {
            //질문응답+서버응답 가지고 result state 업데이트
            stringified = qs.stringify(evalValues);
            if (!stringified) {
                navigate("/");
            }

            navigate(`/result?${stringified}`);
        }, 3000);
    }, []);

    return (
        <LoadingBox>
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
`;
