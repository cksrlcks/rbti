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
import { rmnQuestion } from "./data/question";
import ScrollTop from "./component/ScrollTop";
import RmnScoreBoard from "./component/ScoreBoard";
import { randomPick, sortData } from "./lib/utill";

function App({ rbti }) {
    const navigate = useNavigate();
    const [questionNumber, setQuestionNumber] = useState(1);
    const [data, setData] = useState([]);
    const [originData, setOriginData] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [question, setQuestion] = useState("");
    const [userCount, setUserCount] = useState("");
    const [loading, setLoading] = useState(true);

    const theme = {
        primaryColor: "#f44502",
        secondaryColor: "#06377b",
    };

    useEffect(() => {
        //axios로 실서버에서 데이터 가져오기 (실운용시)
        axios.get("/db.json").then((res) => {
            setLoading(false);
            setData(res.data);
            setOriginData(res.data);

            setQuestion((prev) => {
                const formattedQuestion = rmnQuestion.map((item) => {
                    if (item.qId == 15) {
                        return { ...item, answerList: [...randomPick(res.data, 30)] };
                    } else {
                        return item;
                    }
                });
                return formattedQuestion;
            });
        });

        //유저수 업데이트
        setUserCount(2025);
    }, []);

    const updateAnswer = (qid, value) => {
        const newAnswer = { [qid]: value };
        setAnswer((prev) => ({ ...prev, ...newAnswer }));

        setQuestionNumber((prev) => prev + 1);
    };

    useEffect(() => {
        if (question) {
            if (questionNumber > question.length) {
                setQuestionNumber((prev) => 1);
                navigate("/loading", { state: { done: true } });
            }

            if (questionNumber < 1) {
                setQuestionNumber((prev) => 1);
            }
        }
    }, [questionNumber]);

    const deleteAnswer = (num) => {
        setAnswer((prev) => {
            const newAnswer = { ...prev };
            delete newAnswer[num - 1];

            return newAnswer;
        });
        setQuestionNumber((prev) => prev - 1);
    };

    useEffect(() => {
        const newData = rbti.test(originData, answer);
        setData((prev) => sortData(newData, "score", "desc"));
    }, [answer]);

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
                            <Route path="/loading" element={<Loading rbti={rbti} answer={answer} data={data} originData={originData} question={question} />} />
                            <Route path="/result" element={<Result rbti={rbti} answer={answer} originData={originData} />} setQuestion={setQuestion} setOriginData={setOriginData} />
                        </Routes>
                    </div>
                </div>
                <div className="right">
                    <RmnScoreBoard data={data} />
                </div>
            </AppWrapper>
        </ThemeProvider>
    );
}

export default App;
