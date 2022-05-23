import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const App = ({ children }) => {
    return (
        <AppWrapper id="rbti-root-container">
            <>{children}</>
        </AppWrapper>
    );
};

export default App;

const AppWrapper = styled.div`
    display: flex;
    .left {
        width: calc(100% - 400px);
        .rmn-app {
            max-width: 600px;
            padding: 2em;
            margin: 0 auto;
        }
    }
    .right {
        width: 400px;
        height: 100%;
        padding: 20px 40px;
        border-left: 1px solid #eee;
        line-height: 1.3;
        overflow-y: scroll;
        .score-item {
            margin-bottom: 0.4em;
        }
    }
`;
