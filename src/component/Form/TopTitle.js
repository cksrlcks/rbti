import React from "react";
import styled from "styled-components";
const TopTitle = ({ qId, qTitle }) => {
    return (
        <TopTitleBlock>
            <div className="q-number">Q.{qId}</div>
            <div className="q-title">{qTitle}</div>
        </TopTitleBlock>
    );
};

export default TopTitle;

const TopTitleBlock = styled.div`
    margin: 100px 0 50px;
    .q-number {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 1em;
        color: #000;
    }
    .q-title {
        font-size: 20px;
        color: #000;
        font-weight: 700;
    }
`;
