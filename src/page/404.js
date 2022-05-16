import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            페이지를 찾을수 없습니다.{" "}
            <button type="button" onClick={() => navigate("/")}>
                돌아가기
            </button>
        </div>
    );
};

export default ErrorPage;
