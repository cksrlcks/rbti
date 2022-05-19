import React, { useEffect, useState } from "react";
import InputType from "./InputType";
import OrderType from "./OrderType";
import RadioType from "./RadioType";
import MultiOrderType from "./MultiOrderType";
import MultiType from "./MultiType";
import RmnMulti from "./RmnMulti";
import styled from "styled-components";

const Question = ({ question, handleAnswer, handleGoBack }) => {
    const submitHandler = (value) => {
        handleAnswer(question.qId, value);
    };

    return (
        <Form>
            {question && (
                <>
                    <TopTitle>
                        <div className="q-number">Q.{question.qId}</div>
                        <div className="q-title">{question.title}</div>
                    </TopTitle>
                    <>
                        {question.qType == "input" && <InputType question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />}
                        {question.qType == "radio" && <RadioType question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />}
                        {question.qType == "order" && <OrderType question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />}
                        {question.qType == "multiOrder" && <MultiOrderType question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />}
                        {question.qType == "multi" && <MultiType question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />}
                        {question.qType == "rmn_mulit" && <RmnMulti question={question} submitHandler={submitHandler} handleGoBack={handleGoBack} />}
                    </>
                </>
            )}
        </Form>
    );
};

export default Question;

const TopTitle = styled.div`
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

const Form = styled.div`
    .guide {
        text-align: center;
        margin-bottom: 2em;
        .num {
            color: ${(props) => props.theme.primaryColor};
            font-weight: 700;
        }
    }

    input[type="text"] {
        width: 100%;
        height: 60px;
        border: 2px solid #000;
        padding: 0 1em;
        border-radius: 8px;
        color: #000;
    }

    input {
        &:checked ~ .label {
            background: #000;
            color: #fff;
        }

        &:disabled ~ .label {
            opacity: 0.2;
        }

        &:checked ~ .label {
            opacity: 1;
        }
    }

    .question-control {
        position: relative;
        margin-top: 100px;
        display: flex;
        gap: 4px;

        position: sticky;
        bottom: 0;
        padding: 10px 0;
        background: #fff;
    }

    label {
        display: block;
        .label {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 0 1em;
            width: 100%;
            height: 60px;
            border: 2px solid #000;
            padding: 0 80px 0 1em;
            border-radius: 8px;
            color: #000;
            margin-bottom: 5px;
            position: relative;

            .num {
                position: absolute;
                top: 50%;
                right: 20px;
                width: 30px;
                height: 30px;
                transform: translateY(-50%);
                background: ${(props) => props.theme.primaryColor};
                color: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                font-weight: 700;
            }
        }
    }

    .rmn-btn-wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        .rmn-btn {
            padding: 10px;
            width: 33.333%;

            .label {
                display: block;
                text-align: center;
                height: auto;
                padding: 1em;

                .rmn-img {
                    text-align: center;
                    img {
                        height: 80px;
                        width: auto;
                    }
                }
            }

            input:checked ~ .label {
                background: #fff;
                color: ${(props) => props.theme.primaryColor};
                font-weight: 800;
                border-color: ${(props) => props.theme.primaryColor};
            }
        }
    }
`;
