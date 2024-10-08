import { stringToArray, organizeArray, sortData, randomPick } from "./utill";
import { sort9Filter, sort10Filter } from "../data/filter";
import { rmnQuestion } from "../data/question";
import _ from "lodash";

class Rbti {
    constructor() {}

    init(originData) {
        this.originRmnData = _.cloneDeep(originData);
        this.data = _.cloneDeep(originData);
        this.answer = [];
    }

    getAnswer() {
        this.question = rmnQuestion.map((q) => {
            if (q.qId == 15) {
                return { ...q, answerList: [...randomPick(this.data, 30)] };
            } else {
                return q;
            }
        });

        return this.question;
    }

    eval(qid, value) {
        switch (qid) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
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
                if (value == "내가 좋아하는 라면") {
                } else if (value == "가성비 좋은 라면") {
                    //가성비좋은라면 선택하면 할 행동 (아직 없음)
                } else if (value == "신상라면") {
                    this.data.forEach((data) => {
                        if (data.rmn_tag.includes("신제품")) {
                            const prevScore = data.score;
                            data.score = prevScore + 1;
                        }
                    });
                } else if (value == "인기라면") {
                    this.data.forEach((data) => {
                        if (data.rmn_tag.includes("스테디셀러")) {
                            const prevScore = data.score;
                            data.score = prevScore + 1;
                        }
                    });
                } else if (value == "채식성분 라면") {
                    //채식만 보여주니까 너무 없어짐
                    //this.data = this.data.filter((data) => data.pkgSeq == "22");

                    //채식에 20점 추가로 임시조치
                    this.data.forEach((data) => {
                        if (data.pkg_seq.includes(22)) {
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
                break;
            case 14:
                /*
					value = ["계란", "파"]
				*/

                break;

            case 15:
                /*
					value = ["219","565","12"]
				*/

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
                // fvRmnSeq.forEach((rmnSeq) => {
                //     this.data.forEach((item) => {
                //         if (item.rmn_seq == rmnSeq) {
                //             const prevScore = item.score;
                //             item.score = prevScore + 2;
                //         }
                //     });
                // });

                //2.태그들 스코어 1점 올리기
                this.data.forEach((data) => {
                    fvRmnTag.forEach((tag) => {
                        if (data.rmn_tag.includes(tag)) {
                            const prevScore = data.score;
                            data.score = prevScore + 1;
                        }
                    });
                });

                break;
        }
    }

    test(answer) {
        this.data = this.originRmnData.map((item) => ({ ...item, score: 0 }));
        answer.forEach((answer) => {
            this.eval(answer.qid, answer.value);
        });

        return this.data;
    }
}

export default Rbti;
