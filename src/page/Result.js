import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { stringToArray } from "../lib/utill";
import Button from "../component/Buttons";
import styled from "styled-components";
import ormnData from "../data/ormnData";
import { rmnQuestion as questionList } from "../data/question";
import useBackListener from "../hooks/useBackListener";

const Result = ({ answer }) => {
    const navigate = useNavigate();
    const [result, setResult] = useState("");
    const [bestRmn, setBestRmn] = useState("");
    const [otherFvRmn, setOtherFvRmn] = useState("");
    const [attrRmn, setAttrRmn] = useState("");
    const parsedString = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    useBackListener(() => {
        //뒤로가기시 브라우저의 뒤로가기 가로채기
        navigate("/");
    });

    //결과공유를 위해 응답결과를 URL 스트링으로 저장한걸 들고와서 state업데이트 해주기
    //쿼리 스트링 없으면 검사시작화면으로 보내주기
    useEffect(() => {
        if (!Object.keys(parsedString).length || parsedString.hasOwnProperty("undefined")) {
            //쿼리 스트링 없으면 검사시작화면으로 보내주기
            navigate("/");
        }

        setResult(parsedString);
    }, []);

    //쿼리스트링으로 넘어온 데이터에 있는 라면seq로, 라면데이터에서 라면찾아서 state업데이트 해주기
    //라면정보를 전부 URL에 담기힘들어서, seq만 전달받아서 다시찾기
    useEffect(() => {
        if (result) {
            setBestRmn((prev) => {
                let selected = [];
                result.bestRmn.forEach((item) => {
                    ormnData.forEach((ormnItem) => {
                        if (ormnItem.rmn_seq == item) {
                            selected.push(ormnItem);
                        }
                    });
                });
                return selected;
            });

            setOtherFvRmn((prev) => {
                let selected = [];
                result.otherFvRmn.forEach((item) => {
                    ormnData.forEach((ormnItem) => {
                        if (ormnItem.rmn_seq == item) {
                            selected.push(ormnItem);
                        }
                    });
                });
                return selected;
            });

            setAttrRmn((prev) => {
                const attrRmnInfo = ormnData.find((ormnItem) => ormnItem.rmn_seq == result.attrRmn);
                return attrRmnInfo;
            });
        }
    }, [result]);

    //라면정보에 들어있는 br태그등을 주입하기 위해서
    const createMarkup = (string) => {
        return { __html: string };
    };

    const createImgUrl = (name) => {
        return `https://www.oramyun.com/data/SITE000001/ORMN_RMN/${name}.png`;
    };

    return (
        <>
            {result && bestRmn.length && otherFvRmn.length && (
                <ResultForm>
                    <div className="result-top">
                        <div className="title">
                            <div className="title-find">찾았어요!!!</div>
                            <div className="title-name">{result.answer.q1}님이 제일 좋아하실만한 라면!</div>
                            <div className="title-rmn">
                                <span className="emp">"{bestRmn[0].rmn_nm}"</span>이에요!
                            </div>
                        </div>
                    </div>

                    <div className="result-img-zone">
                        <div className="rmn-comp">{bestRmn[0].mnfctr_nm}</div>
                        <div className="rmn-name">{bestRmn[0].rmn_nm}</div>
                        <div className="rmn-img">
                            <img src={createImgUrl(bestRmn[0].file_save_nm)} alt={bestRmn[0].rmn_nm} />
                        </div>
                        <div className="rmn-info" dangerouslySetInnerHTML={createMarkup(bestRmn[0].rmn_info)}></div>
                        <div className="rmn-tag-list">
                            {stringToArray(bestRmn[0].rmn_tag).map((item, idx) => (
                                <span key={idx} className="rmn-tag">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="result-ment">
                        <div className="ment">
                            해당 제품은 오늘의라면에서 {result.bestRmnRank}번째로 <br />잘 나가는 라면이예요😎
                        </div>
                        <div className="ment">
                            {result.answer.q7 == "매운맛" && "쓰읍하- 화끈한 매운맛에"}
                            {result.answer.q7 == "보통맛" && "딱 좋은 보통 맵기에"}
                            {result.answer.q7 == "순한맛" && "매운맛이 거의 없고"}
                        </div>
                        <div className="ment">
                            <Answer qid={8} value={result.answer.q8} />도 딱이랍니다!
                        </div>
                        <br />
                        <div className="ment">
                            게다가, <Answer qid={9} value={result.answer.q9} />이 이 라면의 매력 중 한가지이며,
                        </div>
                        <div className="ment">
                            {result.answer.q1}님님이 맛있을 것 같다고 선택하신
                            <br />
                            <Answer qid={10} value={result.answer.q10} /> <br />
                            바로 이 <span className="emp">"{bestRmn[0].rmn_nm}"</span>이라구요!!
                        </div>
                        <div className="ment">
                            그리고 지금 제일 끌리시는 {attrRmn.rmn_nm}과(와) {attrRmn.rmn_tag}의 공통점을 가졌어요
                        </div>
                        <div className="ment">
                            {result.answer.q13.length && <>자주 곁들여 드시는 {result.answer.q13.toString()}과(와)도 잘 어울리며, </>}
                            {result.answer.q14.length && <>지금 냉장고에 있는 {result.answer.q14.toString()}을(를) 넣어드셔도 꿀맛이랍니당👍 </>}
                        </div>
                    </div>
                    <div className="rmn-list">
                        {bestRmn.map((item, idx) => {
                            if (idx != 0) {
                                return (
                                    <div className="rmn-item" key={idx}>
                                        <img src={createImgUrl(item.file_save_nm)} alt={item.rmn_nm} />
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="ment">
                        {bestRmn[0].rmn_nm} 다음으로 좋아하실 만한 라면들이에요!
                        <div className="emp">그리고, 지금 이 모~든 라면들을 한 봉지 씩 바로 맛 보실 수 있어요!!</div>
                    </div>
                    <div className="result-btn-wrapper">
                        <a href="https://www.oramyun.com/view.do?no=23" target="_blank">
                            이 조합으로 먹어보기
                        </a>
                        <a href="https://www.oramyun.com/view.do?no=23">내가 직접 다시 고르기</a>
                        <Button name="다시하기" onClick={() => navigate("/")} />
                    </div>
                    <div className="other">
                        <div className="other-ment">
                            <div className="ment">
                                다른 분들은
                                <br />
                                어떤 라면을 좋아했을까요?
                            </div>
                            <a href="https://www.oramyun.com/view.do?no=23" target="_blank">
                                더보기
                            </a>
                        </div>

                        <div className="rmn-list">
                            {otherFvRmn.map((item, idx) => {
                                return (
                                    <div className="rmn-item" key={idx}>
                                        <img src={createImgUrl(item.file_save_nm)} alt={item.rmn_nm} />
                                        <div className="num">{item.fvNum ? item.fvNum : "---"}명의 취향이에요!</div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="share">
                            <button type="button" className="ment">
                                친구에게 테스트 공유하기
                            </button>
                        </div>
                    </div>
                </ResultForm>
            )}
        </>
    );
};

export default Result;

const Answer = ({ qid, value }) => {
    const answerList = questionList.find((question) => question.qId == qid).answerList;
    let label;

    answerList.find((answer) => {
        if (Array.isArray(value)) {
            if (answer.value == value[0]) {
                label = answer.label;
            }
        } else {
            if (answer.value == value) {
                label = answer.label;
            }
        }
    });
    const [answer, setAnswer] = useState(label);

    return <>{answer}</>;
};

const ResultForm = styled.div`
    padding: 100px 0;
    text-align: center;

    .result-top {
        .title {
            font-size: 20px;
            color: #000;

            .title-find {
                margin-bottom: 0.4em;
                font-weight: 700;
                color: ${(props) => props.theme.primaryColor};
            }
            .title-name {
                font-weight: 700;
                font-size: 24px;
                margin-bottom: 1em;
            }
            .title-rmn {
                font-weight: 700;
                font-size: 32px;
            }
        }
        margin-bottom: 40px;
    }

    .result-img-zone {
        margin-bottom: 80px;
        border: 1px solid #eee;
        padding: 40px;

        border-radius: 4px;
        .rmn-comp {
            margin-bottom: 0.7em;
        }
        .rmn-name {
            font-weight: 800;
            color: #000;
            font-size: 24px;
        }
        .rmn-info {
            line-height: 1.4em;
        }
        .rmn-tag-list {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            margin: 20px 0 0;
            .rmn-tag {
                background: #eee;
                color: #000;
                padding: 0.4em 1em;
                border-radius: 4px;
            }
        }
    }

    .ment {
        margin-bottom: 1em;
        line-height: 1.3;
        font-weight: 500;
        color: #000;
        font-size: 18px;
        padding: 0 2em;
        word-break: keep-all;
        .emp {
            margin-top: 0.2em;
        }
    }

    .rmn-list {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        margin-bottom: 30px;
        .rmn-item {
            width: 50%;
            padding: 20px;
        }
    }

    .result-btn-wrapper {
        margin-top: 80px;
        margin-bottom: 100px;
        a {
            display: block;
            width: 100%;
            height: 60px;
            background: ${(props) => props.theme.primaryColor};
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 4px;

            &:first-child {
                background: #fff;
                color: #000;
                border: 2px solid #000;
            }
        }
    }

    .other {
        .other-ment {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            .ment {
                color: #000;
                line-height: 1.3;
                font-size: 24px;
                font-weight: 700;
            }

            a {
                color: #000;
                font-size: 18px;
                font-weight: 700;
            }
        }
    }

    .share {
        button {
            margin: 40px 0;
            width: 100%;
            height: 60px;
            background: ${(props) => props.theme.primaryColor};
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 4px;
        }
    }
`;
