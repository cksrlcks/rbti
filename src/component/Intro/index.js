import React from "react";
import Bongi from "../../assets/img/bongi.png";
import Button from "../Buttons";
import styled from "styled-components";

const Home = ({ setQuestionNumber, userCount }) => {
    return (
        <IntroBlock>
            <div className="top">
                <div className="img">
                    <img src={Bongi} alt="아뜨" />
                </div>
                <div className="sub-title">봉지라면 ver</div>
                <div className="title">나도 몰랐던 내 취향 라면 찾기🌟</div>
                <div className="count">{userCount}명 참여완료!</div>
            </div>
            <Button onClick={() => setQuestionNumber(1)} name={"바로시작하기"} />
        </IntroBlock>
    );
};

export default Home;

const IntroBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    height: 100%;

    .img {
        max-width: 300px;
        margin: 0 auto;
        text-align: center;
        img {
            width: 100%;
        }
    }

    .sub-title {
        font-weight: 700;
        display: inline-block;
        padding: 0.4em 1em;
        color: #fff;
        background: ${(props) => props.theme.secondaryColor};
        margin-bottom: 1em;
        border-radius: 9999px;
    }

    .title {
        font-size: 30px;
        font-weight: 700;
        color: #000;
        margin-bottom: 1em;
    }

    .count {
        background: #eee;
        padding: 0.8em;
        border-radius: 4px;
        color: #000;
        margin-bottom: 2em;
    }
`;
