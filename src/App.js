import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "styled-components";

import AppWrapper from "./component/Layouts/App";
import Question from "./page/Question";
import Loading from "./page/Loading";
import Result from "./page/Result";
import Intro from "./page/Intro";
import ErrorPage from "./page/404";
import ScrollTop from "./component/ScrollTop";
import RmnScoreBoard from "./component/ScoreBoard";
import { randomPick, sortData } from "./lib/utill";

function App({ rbti }) {
    const navigate = useNavigate();
    const [questionNumber, setQuestionNumber] = useState(1);
    const [answer, setAnswer] = useState([]);
    const [question, setQuestion] = useState("");
    const [userCount, setUserCount] = useState("");
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState([]);
    const [originData, setOriginData] = useState([]);

    const theme = {
        primaryColor: "#f44502",
        secondaryColor: "#06377b",
    };

    useEffect(() => {
        //axios로 실서버에서 데이터 가져오기 (실운용시)
        axios.get("/db.json").then((res) => {
            //유저수 업데이트
            setUserCount(2025);

            //가져온 db로 rbti클래스 데이터 생성
            rbti.init(res.data);

            //질문셋팅 (rbti클래스에서 랜덤라면생성해서 질문만들어오기)
            const questionData = rbti.getAnswer();
            setQuestion(questionData);

            //스코어데이터 셋팅
            setScore(rbti.data);

            //오리진
            setOriginData(rbti.originRmnData);

            setLoading(false);
        });
    }, []);

    const updateAnswer = (qid, value) => {
        setAnswer((prev) => [...prev, { qid: qid, value: value }]);
        setQuestionNumber((prev) => prev + 1);
    };

    const deleteAnswer = (qid) => {
        setAnswer((prev) => prev.filter((item) => item.qid != qid - 1));
        setQuestionNumber((prev) => prev - 1);
    };

    useEffect(() => {
        if (question) {
            console.log(answer);
            const newScore = rbti.test(answer);
            setScore(sortData(newScore, "score", "desc"));

            if (questionNumber > question.length) {
                navigate("/loading", { state: { done: true } });
            }
        }
    }, [questionNumber]);

    return (
        <ThemeProvider theme={theme}>
            <AppWrapper>
                <div className="left">
                    <div className="rmn-app">
                        <ScrollTop />
                        <Routes>
                            <Route path="*" element={<ErrorPage />} />
                            <Route path="/" element={<Intro userCount={userCount} loading={loading} />} />
                            <Route path="/question" element={<Question rbti={rbti} updateAnswer={updateAnswer} deleteAnswer={deleteAnswer} question={question} questionNumber={questionNumber} />} />
                            <Route path="/loading" element={<Loading rbti={rbti} question={question} answer={answer} score={score} />} />
                            <Route path="/result" element={<Result rbti={rbti} question={question} originData={originData} />} />
                        </Routes>
                    </div>
                </div>
                <div className="right">
                    <RmnScoreBoard score={score} />
                </div>
            </AppWrapper>
        </ThemeProvider>
    );
}

export default App;
