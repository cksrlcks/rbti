import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import { sortData, stringToArray, createMarkup, createImgUrl } from "../lib/utill";
import Button from "../component/Buttons";
import styled from "styled-components";
import { rmnQuestion as question } from "../data/question";
import { motion } from "framer-motion";

const Result = ({ originData }) => {
    const navigate = useNavigate();
    const { testId } = useParams();
    const { state } = useLocation();
    const [result, setResult] = useState("");
    const [attrRmn, setAttrRmn] = useState("");

    useEffect(() => {
        //뒤로가기 방지
        const preventGoBack = () => {
            window.history.pushState(null, "", window.location.href);
        };

        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", preventGoBack);

        return () => window.removeEventListener("popstate", preventGoBack);
    }, []);

    useEffect(() => {
        if (originData) {
            if (state) {
                setResult(state);
            } else {
                if (testId) {
                    //서버에서 testId로 result가져오기(mockTestData)
                    axios
                        .get(`/api/${testId}`)
                        .then()
                        .catch((err) => console.log("임시api"))
                        .then(() => {
                            setResult(mockTestData);
                        });
                } else {
                    navigate("/");
                }
            }
        }
    }, [state, originData]);

    useEffect(() => {
        if (result) {
            setAttrRmn((prev) => {
                return originData.find((item) => item.rmn_seq == result.attrRmn);
            });
        }
    }, [result, originData]);

    const goHome = () => {
        window.location.replace("/");
    };
    return (
        <>
            {result && (
                <ResultForm as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <motion.div className="result-top" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                        <div className="title">
                            <div className="title-find">찾았어요!!!</div>
                            <div className="title-name">{result.name}님이 제일 좋아하실만한 라면!</div>
                            <div className="title-rmn">
                                <span className="emp">"{result.pickRmn[0].rmn_nm}"</span>이에요!
                            </div>
                        </div>
                    </motion.div>

                    <div className="result-img-zone">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                            <div className="rmn-comp">{result.pickRmn[0].mnfctr_nm}</div>
                            <div className="rmn-name">{result.pickRmn[0].rmn_nm}</div>
                        </motion.div>

                        <motion.div className="rmn-img" initial={{ scale: 5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}>
                            <img src={createImgUrl(result.pickRmn[0].file_save_nm)} alt={result.pickRmn[0].rmn_nm} />
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                            <div className="rmn-info" dangerouslySetInnerHTML={createMarkup(result.pickRmn[0].rmn_info)}></div>
                            <div className="rmn-tag-list">
                                {stringToArray(result.pickRmn[0].rmn_tag).map((item, idx) => (
                                    <span key={idx} className="rmn-tag">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div className="result-ment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                        <div className="ment">
                            해당 제품은 오늘의라면에서 {result.bestRmnRnk}번째로 <br />잘 나가는 라면이예요😎
                        </div>
                        <div className="ment">
                            {result.answer[6].value == "매운맛" && "쓰읍하- 화끈한 매운맛에"}
                            {result.answer[6].value == "보통맛" && "딱 좋은 보통 맵기에"}
                            {result.answer[6].value == "순한맛" && "매운맛이 거의 없고"}
                        </div>
                        <div className="ment">
                            <Answer question={question} qid={8} value={result.answer[7].value} />도 딱이랍니다!
                        </div>
                        <br />
                        <div className="ment">
                            게다가, <Answer question={question} qid={9} value={result.answer[8].value} />이 이 라면의 매력 중 한가지이며,
                        </div>
                        <div className="ment">
                            {result.answer[0].value}님님이 맛있을 것 같다고 선택하신
                            <br />
                            <Answer question={question} qid={10} value={result.answer[9].value} /> <br />
                            바로 이 <span className="emp">"{result.pickRmn[0].rmn_nm}"</span>이라구요!!
                        </div>
                        <div className="ment">
                            그리고 지금 제일 끌리시는 {attrRmn?.rmn_nm}과(와) {attrRmn?.rmn_tag}의 공통점을 가졌어요
                        </div>
                        <div className="ment">
                            {result.answer[12].value != "없어요" && <>자주 곁들여 드시는 {result.answer[12].value.toString()}과(와)도 잘 </>}
                            {result.answer[12].value != "없어요" && result.answer[13].value == "없어요" ? "어울려요." : "어울리며"}
                            {result.answer[13].value != "없어요" && <>지금 냉장고에 있는 {result.answer[13].value.toString()}을(를) 넣어드셔도 꿀맛이랍니당👍 </>}
                        </div>
                    </motion.div>
                    <motion.div className="rmn-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                        {result.pickRmn.map((item, idx) => {
                            if (idx != 0) {
                                return (
                                    <div className="rmn-item" key={idx}>
                                        <img src={createImgUrl(item.file_save_nm)} alt={item.rmn_nm} />
                                    </div>
                                );
                            }
                        })}
                    </motion.div>
                    <motion.div className="ment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                        {result.pickRmn[0].rmn_nm} 다음으로 좋아하실 만한 라면들이에요!
                        <div className="emp">그리고, 지금 이 모~든 라면들을 한 봉지 씩 바로 맛 보실 수 있어요!!</div>
                    </motion.div>
                    <motion.div className="result-btn-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                        <a href="https://www.oramyun.com/view.do?no=23" target="_blank">
                            이 조합으로 먹어보기
                        </a>
                        <a href="https://www.oramyun.com/view.do?no=23" target="_blank">
                            내가 직접 다시 고르기
                        </a>
                        <Button name="다시하기" onClick={() => goHome()} />
                    </motion.div>
                    <motion.div className="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
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
                            {sortData(originData, "fvNum", "desc")
                                .slice(0, 4)
                                .map((item, idx) => {
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
                    </motion.div>
                </ResultForm>
            )}
        </>
    );
};

export default Result;

const Answer = ({ qid, value, question }) => {
    const answerList = question.find((question) => question.qId == qid).answerList;
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
            flex-wrap: wrap;
            gap: 5px;
            margin: 20px 0 0;
            .rmn-tag {
                background: #eee;
                color: #000;
                padding: 0.4em 1em;
                border-radius: 4px;
                white-space: nowrap;
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

const mockTestData = {
    gender: "여성",
    age: "20대",
    frequency: "4",
    quantity: "3",
    name: "rty",
    pickRmn: [
        {
            pkg_seq: [22, -1, 18, 0],
            rmn_nm: "채황",
            rmn_seq: 57,
            cate1: "0100000",
            rmn_info: "영국 비건협회 인증을 받은 채소라면의 황제! <br> 푸짐한 야채 건더기와 구수한 국물",
            rmn_tag: "국물라면,순한맛,베지,저칼로리,맑은국물,구수한맛",
            pgm_file_id: "FILE00000000254",
            new_yn: "N",
            mnfctr_nm: "오뚜기라면 주식회사",
            pgm_file_seq: 0,
            site_id: "SITE000001",
            file_save_nm: "ORMN_RMN_202109020930523030",
            file_real_nm: "noodleimg011.png",
            file_size: 51830,
            file_type: null,
            file_dtl_type: null,
            file_ext: "png",
            file_path: "/SITE000001/ORMN_RMN/",
            sort_seq: 0,
            tgt_tbl: "ORMN_RMN",
            tgt_seq: null,
            regi_id: "oramyun",
            regi_dtm: "2021-09-02 09:30:52.317772",
            score: 30,
            sellNum: 16,
            fvNum: 800,
        },
        {
            pkg_seq: [22, -1, 0, 18],
            rmn_nm: "야채라면",
            rmn_seq: 58,
            cate1: "0100000",
            rmn_info: "깔끔하고 담백한 비건라면! <br> 생생한 면발에 6가지 야채로 낸 개운한 국물맛!",
            rmn_tag: "국물라면,순한맛,구수한맛,저칼로리,베지",
            pgm_file_id: "FILE00000000255",
            new_yn: "N",
            mnfctr_nm: "(주)농심",
            pgm_file_seq: 0,
            site_id: "SITE000001",
            file_save_nm: "ORMN_RMN_202109020947539330",
            file_real_nm: "noodleimg012.png",
            file_size: 57033,
            file_type: null,
            file_dtl_type: null,
            file_ext: "png",
            file_path: "/SITE000001/ORMN_RMN/",
            sort_seq: 0,
            tgt_tbl: "ORMN_RMN",
            tgt_seq: null,
            regi_id: "oramyun",
            regi_dtm: "2021-09-02 09:47:53.944599",
            score: 30,
            sellNum: 29,
            fvNum: 1450,
        },
        {
            pkg_seq: [-1, 18, 22, 0],
            rmn_nm: "자연은 맛있다 정비빔면",
            rmn_seq: 63,
            cate1: "0100000",
            rmn_info: "매콤 새콤달콤 감칠맛이 느껴지는 고급스러운 맛! <br> 비건계의 프리미엄 비빔라면",
            rmn_tag: "비빔라면, 보통맛, 베지, 건면, 저칼로리, 저나트륨,",
            pgm_file_id: "FILE00000000260",
            new_yn: "N",
            mnfctr_nm: "(주)피피이씨음성생면",
            pgm_file_seq: 0,
            site_id: "SITE000001",
            file_save_nm: "ORMN_RMN_202109021054018380",
            file_real_nm: "noodleimg017.png",
            file_size: 43453,
            file_type: null,
            file_dtl_type: null,
            file_ext: "png",
            file_path: "/SITE000001/ORMN_RMN/",
            sort_seq: 0,
            tgt_tbl: "ORMN_RMN",
            tgt_seq: null,
            regi_id: "oramyun",
            regi_dtm: "2021-09-02 10:54:01.896871",
            score: 30,
            sellNum: 45,
            fvNum: 2250,
        },
        {
            pkg_seq: [-1, 0, 18, 22],
            rmn_nm: "열무비빔면",
            rmn_seq: 124,
            cate1: "0100000",
            rmn_info: "가늘고 쫄깃한 면발과 청량감! <br> 입안 한 가득 느껴지는 열무의 매콤새콤함!",
            rmn_tag: "비빔라면,보통맛,스테디셀러,저나트륨",
            pgm_file_id: "FILE00000000401",
            new_yn: "N",
            mnfctr_nm: "삼양식품㈜",
            pgm_file_seq: 1,
            site_id: "SITE000001",
            file_save_nm: "ORMN_RMN_202112010450198571",
            file_real_nm: "열무비빔면.png",
            file_size: 45225,
            file_type: null,
            file_dtl_type: null,
            file_ext: "png",
            file_path: "/SITE000001/ORMN_RMN/",
            sort_seq: 1,
            tgt_tbl: "ORMN_RMN",
            tgt_seq: null,
            regi_id: "wcon",
            regi_dtm: "2021-12-01 16:50:19.859582",
            score: 30,
            sellNum: 67,
            fvNum: 3350,
        },
        {
            pkg_seq: [-1, 0, 18, 22],
            rmn_nm: "삼육채식라면(순한맛)",
            rmn_seq: 291,
            cate1: "0100000",
            rmn_info: "순 식물성으로 만든 면! <br> 국산 현미로 만든 면과 국산 버섯이 함유되어 담백한 국물의 채식 라면",
            rmn_tag: "국물라면, 순한맛, 이색라면, 베지, 저칼로리,",
            pgm_file_id: "FILE00000000717",
            new_yn: "N",
            mnfctr_nm: "(주)새롬식품",
            pgm_file_seq: 1,
            site_id: "SITE000001",
            file_save_nm: "ORMN_RMN_202203230319196511",
            file_real_nm: "noodleimg134.png",
            file_size: 62033,
            file_type: null,
            file_dtl_type: null,
            file_ext: "png",
            file_path: "/SITE000001/ORMN_RMN/",
            sort_seq: 1,
            tgt_tbl: "ORMN_RMN",
            tgt_seq: null,
            regi_id: "oranee1",
            regi_dtm: "2022-03-23 15:19:19.657708",
            score: 30,
            sellNum: 187,
            fvNum: 9350,
        },
    ],
    bestRmnRnk: 145,
    attrRmn: "313",
    answer: [
        {
            qid: 1,
            value: "rty",
        },
        {
            qid: 2,
            value: "여성",
        },
        {
            qid: 3,
            value: "20대",
        },
        {
            qid: 4,
            value: "4",
        },
        {
            qid: 5,
            value: "3",
        },
        {
            qid: 6,
            value: ["비빔라면", "볶음라면", "국물라면", "짜장라면"],
        },
        {
            qid: 7,
            value: "순한맛",
        },
        {
            qid: 8,
            value: "볶음라면, 짜장라면, 치즈&크림",
        },
        {
            qid: 9,
            value: "단짠단짠",
        },
        {
            qid: 10,
            value: ["해물맛", "구수담백", "맑은라면"],
        },
        {
            qid: 11,
            value: "채식성분 라면",
        },
        {
            qid: 12,
            value: "모두",
        },
        {
            qid: 13,
            value: ["밥", "단무지"],
        },
        {
            qid: 14,
            value: ["고추", "소세지"],
        },
        {
            qid: 15,
            value: ["50", "313", "58"],
        },
    ],
};
