import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const App = ({ children }) => {
    return (
        <AppWrapper id="rbti-root-container">
            <div>{children}</div>
        </AppWrapper>
    );
};

export default App;

const AppWrapper = styled.div`
    padding: 2em;
`;
