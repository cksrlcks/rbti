import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import AppWrapper from "./component/Layouts/App";
import Question from "./page/Question";
import Loading from "./page/Loading";
import Result from "./page/Result";
import Intro from "./component/Intro";
import ErrorPage from "./page/404";
import { rmnQuestion } from "./data/question";

function App({ rbti }) {
    const defaultAnswer = rmnQuestion.map((item) => ({ qid: item.qId }));
    const [answer, setAnswer] = useState(defaultAnswer);
    const [userCount, setUserCount] = useState("");

    const updateAnswer = (qid, value) => {
        setAnswer((prev) =>
            prev.map((item) => {
                if (item.qid == qid) {
                    return { ...item, value: value };
                } else {
                    return item;
                }
            })
        );
    };

    const theme = {
        primaryColor: "#f44502",
        secondaryColor: "#06377b",
    };

    useEffect(() => {
        //설문참여한 사람수 가져와야함(axios)
        //임의로 숫자 넣음
        setUserCount(2025);
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <AppWrapper>
                <Router>
                    <Routes>
                        <Route path="*" element={<ErrorPage />} />
                        <Route path="/" element={<Intro userCount={userCount} />} />
                        <Route path="/question" element={<Question questionList={rmnQuestion} updateAnswer={updateAnswer} />} />
                        <Route path="/loading" element={<Loading rbti={rbti} questionList={rmnQuestion} answer={answer} />} />
                        <Route path="/result" element={<Result rbti={rbti} questionList={rmnQuestion} answer={answer} />} />
                    </Routes>
                </Router>
            </AppWrapper>
        </ThemeProvider>
    );
}

export default App;
