import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate, useNavigate } from "react-router-dom";

import Home from "./page/Home";
import Question from "./page/Question";
import Result from "./page/Result";
import ErrorPage from "./page/404";
import { rmnQuestion } from "./data/question";

function App({ rbti }) {
    const defaultAnswer = rmnQuestion.map((item) => ({ qid: item.qId }));
    const [answer, setAnswer] = useState(defaultAnswer);
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
    return (
        <Router>
            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<Navigate replace to="question" />} />
                <Route path="/question" element={<Question rbti={rbti} questionList={rmnQuestion} updateAnswer={updateAnswer} />} />
                <Route path="/result" element={<Result rbti={rbti} questionList={rmnQuestion} answer={answer} />} />
            </Routes>
        </Router>
    );
}

export default App;
