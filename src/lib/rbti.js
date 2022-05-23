import { stringToArray, organizeArray, sortData } from "./utill";
import { sort9Filter, sort10Filter } from "../data/filter";
import { randomPick } from "../lib/utill";

class Rbti {
    constructor() {}

    set(data, questionList) {
        this.answer = {}; //유저의 응답데이터 원본꾸러미
        this.questionList = questionList;
        this.originRmnData = data; //결과페이지에서 라면seq로 참조할 원본데이터 (봉지라면전부)
        this.data = data; //eval을 통해 score주고, 삭제시킨 라면들 결과
        this.randomRmn = randomPick(this.originRmnData, 30);
        //랜덤라면 질문에 집어넣기
        this.questionList.find((item) => item.qId == 15).answerList = this.randomRmn;
    }

    resetScore(array) {
        array.forEach((item) => (item.score = 0));
    }

    eval(qid, value) {
        switch (qid) {
            case 1:
                this.answer.q1 = value;
                break;
            case 2:
                this.answer.q2 = value;
                break;
            case 3:
                this.answer.q3 = value;
                break;
            case 4:
                this.answer.q4 = value;
                break;

            case 5:
                this.answer.q5 = value;
                break;
            case 6:
                this.answer.q6 = value;

                /*
                ex) value = ["매운맛", "느끼한맛", ...]
                */

                const items = organizeArray(value);
                const itemLength = items.length;
                items.forEach((item, idx) => {
                    this.data.forEach((data) => {
                        if (data.rmn_tag.includes(item)) {
                            const prevScore = data.score;
                            data.score = prevScore + itemLength - idx;
                        }
                    });
                });

                break;

            case 7:
                this.answer.q7 = value;

                /*
                ex) value = "매운맛"
                */
                if (value == "모두") {
                    this.data.forEach((data) => {
                        const prevScore = data.score;
                        data.score = prevScore + 1;
                    });
                } else {
                    this.data.forEach((data) => {
                        if (data.rmn_tag.includes(value)) {
                            const prevScore = data.score;
                            data.score = prevScore + 2;
                        }
                    });

                    if (value == "순한맛") {
                        this.data = this.data.filter((item) => !item.rmn_tag.includes("매운맛"));
                    }
                }

                break;

            case 8:
                this.answer.q8 = value;

                /*
                ex) value = "매운맛"
                */
                if (value == "모두") {
                    this.data.forEach((data) => {
                        const prevScore = data.score;
                        data.score = prevScore + 1;
                    });
                } else {
                    const valueArray = stringToArray(value);

                    this.data.forEach((data) => {
                        valueArray.forEach((valueItem) => {
                            if (data.rmn_tag.includes(valueItem)) {
                                const prevScore = data.score;
                                data.score = prevScore + 1;
                                //한번 햇으면 forEach break하고 다음 라면 아이템 가기(foreach escape)
                                return false;
                            }
                        });
                    });
                }
                break;

            case 9:
                this.answer.q9 = value;

                sort9Filter
                    .filter((item) => item.key == value)
                    .forEach((item) => {
                        item.items.forEach((item) => {
                            this.data.forEach((data) => {
                                if (data.rmn_seq == item) {
                                    const prevScore = data.score;
                                    data.score = prevScore + 1;
                                }
                            });
                        });
                    });

                break;

            case 10:
                this.answer.q10 = value;

                sort10Filter
                    .filter((item) => item.key == value[0])
                    .forEach((item) => {
                        item.items.forEach((item) => {
                            this.data.forEach((data) => {
                                if (data.rmn_seq == item) {
                                    const prevScore = data.score;
                                    data.score = prevScore + 5;
                                }
                            });
                        });
                    });

                sort10Filter
                    .filter((item) => item.key == value[1])
                    .forEach((item) => {
                        item.items.forEach((item) => {
                            this.data.forEach((data) => {
                                if (data.rmn_seq == item) {
                                    const prevScore = data.score;
                                    data.score = prevScore + 4;
                                }
                            });
                        });
                    });

                sort10Filter
                    .filter((item) => item.key == value[2])
                    .forEach((item) => {
                        item.items.forEach((item) => {
                            this.data.forEach((data) => {
                                if (data.rmn_seq == item) {
                                    const prevScore = data.score;
                                    data.score = prevScore + 3;
                                }
                            });
                        });
                    });
                break;
            case 11:
                this.answer.q11 = value;

                if (value == "내가 좋아하는 라면") {
                } else if (value == "가성비 좋은 라면") {
                    //가성비좋은라면 선택하면 할 행동 (아직 없음)
                } else if (value == "신상라면") {
                    this.data.forEach((data) => {
                        if (data.new_yn == "Y") {
                            const prevScore = data.score;
                            data.score = prevScore + 1;
                        }
                    });
                } else if (value == "인기라면") {
                    this.data.forEach((data) => {
                        if (data.rcmd_yn == "Y") {
                            const prevScore = data.score;
                            data.score = prevScore + 1;
                        }
                    });
                } else if (value == "채식성분 라면") {
                    console.log(value);
                    //채식만 보여주니까 너무 없어짐
                    //this.data = this.data.filter((data) => data.pkgSeq == "22");

                    //채식에 20점 추가로 임시조치
                    this.data.forEach((data) => {
                        if (data.pkgSeq == 22 || data.pkgSeq == 18) {
                            console.log(data.pkgSeq);
                            const prevScore = data.score;
                            data.score = prevScore + 20;
                        }
                    });
                } else if (value == "저칼로리&저나트륨 라면") {
                    var testValue = ["저칼로리", "저나트륨"];

                    this.data.forEach((data) => {
                        testValue.forEach((valueItem) => {
                            if (data.rmn_tag.includes(valueItem)) {
                                const prevScore = data.score;
                                data.score = prevScore + 1;
                                //한번 햇으면 forEach break하고 다음 라면 아이템 가기
                                return false;
                            }
                        });
                    });
                }
                break;
            case 12:
                this.answer.q12 = value;

                if (value == "네") {
                    this.data.forEach((data) => {
                        if (data.rmn_tag.includes("이색라면")) {
                            const prevScore = data.score;
                            data.score = prevScore + 1;
                        }

                        if (data.new_yn == "Y") {
                            const prevScore = data.score;
                            data.score = prevScore + 1;
                        }
                    });
                } else if (value == "아니요") {
                    this.data = this.data.filter((data) => !data.rmn_tag.includes("이색라면"));
                    this.data = this.data.filter((data) => data.new_yn != "Y");
                } else if (value == "모두") {
                    this.data.forEach((data) => {
                        const prevScore = data.score;
                        data.score = prevScore + 1;
                    });
                }

                break;
            case 13:
                /*
                    value = ["밥", "김치"]
                */
                this.answer.q13 = value;
                break;
            case 14:
                /*
					value = ["계란", "파"]
				*/
                this.answer.q14 = value;

                break;

            case 15:
                /*
					value = ["219","565","12"]
				*/
                this.answer.q15 = value;

                //value로 넘어온 배열 앞뒤공백제거 및 중복제거
                const fvRmnSeq = organizeArray(value);
                let fvRmnTagList = [];

                fvRmnSeq.forEach((rmnSeq) => {
                    this.data.forEach((item) => {
                        if (item.rmn_seq == rmnSeq) {
                            const tagArray = stringToArray(item.rmn_tag);

                            fvRmnTagList = [...fvRmnTagList, ...tagArray];
                        }
                    });
                });

                const fvRmnTag = [...new Set(fvRmnTagList)]; //중복제거

                //1.해당 라면 스코어 2점 올리기
                fvRmnSeq.forEach((rmnSeq) => {
                    this.data.forEach((item) => {
                        if (item.rmn_seq == rmnSeq) {
                            const prevScore = item.score;
                            item.score = prevScore + 2;
                        }
                    });
                });

                //2.태그들 스코어 1점 올리기
                this.data.forEach((data) => {
                    fvRmnTag.forEach((tag) => {
                        if (data.rmn_tag.includes(tag)) {
                            const prevScore = data.score;
                            data.score = prevScore + 1;
                        }
                    });
                });

                //끌리는 라면의 공통점찾기
                const evalAttrRmn = (seqArray) => {
                    let tags = [];

                    seqArray.forEach((seq) => {
                        this.originRmnData.forEach((ormn) => {
                            if (seq == ormn.rmn_seq) {
                                let selectedTags = stringToArray(ormn.rmn_tag);
                                tags = [...tags, ...selectedTags];
                            }
                        });
                    });

                    //tags배열 중복제거
                    let newTags = new Set(tags);

                    //seqArray에 점수주기
                    const list = seqArray.map((seq) => {
                        let score = 0;
                        newTags.forEach((tag) => {
                            this.originRmnData.forEach((ormn) => {
                                if (ormn.rmn_seq == seq && ormn.rmn_tag.includes(tag)) {
                                    score++;
                                }
                            });
                        });

                        return {
                            rmn_seq: seq,
                            score: score,
                        };
                    });

                    //score제일 큰 항목 찾기
                    const max = list.reduce(function (prev, current) {
                        return prev.score > current.score ? prev : current;
                    });

                    return max.rmn_seq;
                };

                //끌리는 라면중 공통된태그가 가장많은 라면(seq배열만 전달)
                this.attrRmn = evalAttrRmn(fvRmnSeq);

                break;
        }
    }

    test(answer) {
        const newData = this.data ? [...this.data] : [];
        this.resetScore(this.data ? this.data : []);
        for (const key in answer) {
            this.eval(+key, answer[key]);
        }

        return newData;
    }

    result(answer) {
        //this.test(answer);

        //베스트라면(유저응답에 따른) 5개선정 (seq배열만 전달)
        this.bestRmn = sortData(this.data, "score", "desc")
            .map((item, idx) => item.rmn_seq)
            .slice(0, 5);

        //베스트라면 첫번째라면의 잘팔리는순위 (sellNum로 판단)
        this.bestRmnRank = sortData(this.originRmnData, "sellNum", "desc").find((item) => item.rmn_seq == this.bestRmn[0]).sellNum;

        //다른사람 베스트라면(라면데이터) 4개선정 (seq배열만 전달)
        this.otherFvRmn = sortData(this.originRmnData, "fvNum", "desc")
            .map((item, idx) => item.rmn_seq)
            .slice(0, 4);

        return {
            answer: this.answer,
            bestRmn: this.bestRmn,
            bestRmnRank: this.bestRmnRank,
            attrRmn: this.attrRmn,
            otherFvRmn: this.otherFvRmn,
        };
    }
}

export default Rbti;
