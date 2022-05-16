import React from "react";
import { useNavigate } from "react-router-dom";

const mockData = {
    answeredUsers: 5000,
};

const Home = ({ setQuestionNumber }) => {
    const navigate = useNavigate();
    return (
        <div>
            {mockData.answeredUsers}명 참여완료!
            <br />
            <button type="button" onClick={() => setQuestionNumber(1)}>
                바로시작하기
            </button>
        </div>
    );
};

export default Home;
