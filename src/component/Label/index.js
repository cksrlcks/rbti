import React from "react";
import styled from "styled-components";

const Label = ({ children }) => {
    return <LabelBlock>{children}</LabelBlock>;
};

export default Label;

const LabelBlock = styled.label`
    display: block;
    input {
        position: absolute;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);

        &:checked ~ .label {
            background: #000;
            color: #fff;
        }
    }

    .label {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0 1em;
        width: 100%;
        height: 60px;
        border: 2px solid #000;
        padding: 0 1em;
        border-radius: 8px;
        color: #000;
    }

    & + & {
        margin-top: 6px;
    }
`;
