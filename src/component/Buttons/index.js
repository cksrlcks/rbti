import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Button = ({ role, name, onClick, className }) => {
    return (
        <ButtonBlock type="button" className={className} onClick={() => onClick()}>
            {name}
        </ButtonBlock>
    );
};

export default Button;

const ButtonBlock = styled.button`
    cursor: pointer;
    background: ${(props) => props.theme.primaryColor};
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    &.prev {
        background: #ddd;
        color: #000;
        width: 100px;
    }

    &.reset {
        position: absolute;
        bottom: 70px;
        width: auto;
        height: 40px;
        left: 50%;
        transform: translateX(-50%);
        background: #000;
        border-radius: 9999px;
        font-size: 15px;
        color: #fff;
        padding: 0 1em;
    }
`;
