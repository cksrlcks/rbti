import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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

function App({ rbti }) {
    const [answer, setAnswer] = useState([]);
    const [userCount, setUserCount] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //라면데이터 들고와서 rbti서비스 만들어서 state화 해주기
        //원하는곳에서 rbti클래스의 메서드 쓸수잇음
        //rmnData넣어서 인스터스 생성 필요한데, 데이터는 임시로 db에서 json파일 뽑아서 사용했음,
        //실제로는 서버에서 가져와서 넣어줘야함 (각 라면을 좋아하는 사람수등의 데이터 필요)

        //라면데이타 필요한 값
        // 1. pkgSeq //채식라면구별용
        // 2. rmn_nm
        // 3. rmn_seq
        // 4. rmn_info
        // 5. rnm_tag
        // 6. new_yn
        // 7. mnfctr_nm
        // 8. pgm_file_id or Img Path : 이미지URL만 주는게 제일좋은
        // 9. fvNum //좋아하는 숫자

        //axios로 실서버에서 데이터 가져오기 (실운용시)
        axios.get("/db.json").then((res) => {
            setLoading(false);
            rbti.set(res.data, rmnQuestion);
        });
    }, []);

    const updateAnswer = (qid, value) => {
        const newAnswer = { [qid]: value };
        setAnswer((prev) => ({ ...prev, ...newAnswer }));
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
                    <ScrollTop />
                    <Routes>
                        <Route path="*" element={<ErrorPage />} />
                        <Route path="/" element={<Intro userCount={userCount} loading={loading} />} />
                        <Route path="/question" element={<Question rbti={rbti} updateAnswer={updateAnswer} />} />
                        <Route path="/loading" element={<Loading rbti={rbti} answer={answer} />} />
                        <Route path="/result" element={<Result rbti={rbti} answer={answer} />} />
                    </Routes>
                </Router>
            </AppWrapper>
        </ThemeProvider>
    );
}

export default App;
