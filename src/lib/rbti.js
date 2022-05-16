const sortJSON = function (data, key, type) {
    if (type == undefined) {
        type = "asc";
    }
    return data.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (type == "desc") {
            return x > y ? -1 : x < y ? 1 : 0;
        } else if (type == "asc") {
            return x < y ? -1 : x > y ? 1 : 0;
        }
    });
};

class Rbti {
    constructor(data) {
        this.data = data;
        this.userData = {};
    }

    save() {}

    load() {}
    eval(qid, value) {
        //console.log(`넘어온 질문번호:${qid} / 데이터 : ${value}`);
        switch (qid) {
            case 1:
                this.userData.name = value;
                break;
            case 2:
                this.userData.gender = value;
                break;
            case 3:
                this.userData.ageRange = value;
                break;
            case 4:
                this.userData.eatPerWeek = value;
                break;

            case 5:
                this.userData.eatPerOnce = value;
                break;
            case 6:
                /*
                ex) value = ["매운맛", "느끼한맛", ...]
                */
                var itemLength = value.length;
                for (let i = 0; i < itemLength; i++) {
                    this.data.forEach((data) => {
                        if (data.rmn_tag.includes(value[i])) {
                            const prevScroe = data.score;
                            data.score = prevScroe + itemLength - i;
                        }
                    });
                }

                break;

            case 7:
                /*
                ex) value = "매운맛"
                */
                if (value == "모두") {
                    this.data.forEach((data) => {
                        const prevScroe = data.score;
                        data.score = prevScroe + 1;
                    });
                } else {
                    this.data.forEach((data) => {
                        if (data.rmn_tag.includes(value)) {
                            const prevScroe = data.score;
                            data.score = prevScroe + 2;
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
                        const prevScroe = data.score;
                        data.score = prevScroe + 1;
                    });
                } else {
                    const valueArray = value
                        .split(",")
                        .map((element) => element.trim())
                        .filter((element) => element !== "");

                    this.data.forEach((data) => {
                        valueArray.forEach((valueItem) => {
                            if (data.rmn_tag.includes(valueItem)) {
                                const prevScroe = data.score;
                                data.score = prevScroe + 1;
                                //한번 햇으면 forEach break하고 다음 라면 아이템 가기
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
                                    const prevScroe = data.score;
                                    data.score = prevScroe + 1;
                                }
                            });
                        });
                    });

                break;
            case 10:
                sort10Filter
                    .filter((item) => item.key == value)
                    .forEach((item) => {
                        item.items.forEach((item) => {
                            this.data.forEach((data) => {
                                if (data.rmn_seq == item) {
                                    const prevScroe = data.score;
                                    data.score = prevScroe + 1;
                                }
                            });
                        });
                    });
                break;
            case 11:
                if (value == "내가 좋아하는 라면") {
                } else if (value == "가성비 좋은 라면") {
                } else if (value == "신상라면") {
                    this.data.forEach((data) => {
                        if (data.new_yn == "Y") {
                            data.score++;
                        }
                    });
                } else if (value == "인기라면") {
                    this.data.forEach((data) => {
                        if (data.rcmd_yn == "Y") {
                            data.score++;
                        }
                    });
                } else if (value == "채식성분 라면") {
                    this.data = this.data.filter((data) => data.pkgSeq == "22");
                } else if (value == "저칼로리&저나트륨 라면") {
                    var testValue = ["저칼로리", "저나트륨"];

                    this.data.forEach((data) => {
                        testValue.forEach((valueItem) => {
                            if (data.rmn_tag.includes(valueItem)) {
                                const prevScroe = data.score;
                                data.score = prevScroe + 1;
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
                            const prevScroe = data.score;
                            data.score = prevScroe + 1;
                        }

                        if (data.new_yn == "Y") {
                            const prevScroe = data.score;
                            data.score = prevScroe + 1;
                        }
                    });
                } else if (value == "아니요") {
                    this.data = this.data.filter((data) => !data.rmn_tag.includes("이색라면"));
                    this.data = this.data.filter((data) => data.new_yn != "Y");
                } else if (value == "모두") {
                    this.data.forEach((data) => data.score++);
                }

                break;
            case 13:
                /*
                    value = ["밥", "김치"]
                */
                this.userData.withRmn = value;
                break;
            case 14:
                /*
                        value = ["계란", "파"]
                    */
                this.userData.nowVeg = value;

                break;
        }
    }

    result(dataArray) {
        dataArray.forEach((data, idx) => {
            data.value && this.eval(idx + 1, data.value);
        });

        return {
            answer: dataArray,
            data: this.data,
            userData: this.userData,
        };
    }
}

export default Rbti;

const sort9Filter = [
    {
        key: "면발",
        items: [125, 96, 126, 67],
    },
    {
        key: "국물",
        items: [318, 101, 90, 47],
    },
    {
        key: "단짠단짠",
        items: [319],
    },
    {
        key: "후레이크&후첨",
        items: [127],
    },
    {
        key: "계란,파",
        items: [65],
    },
];

const sort10Filter = [
    {
        key: "칼칼",
        items: [65],
    },
    {
        key: "해물맛",
        items: [127],
    },
    {
        key: "짭짤꾸덕",
        items: [150],
    },
    {
        key: "맑은라면",
        items: [318],
    },
    {
        key: "구수담백",
        items: [125],
    },
    {
        key: "소시지",
        items: [72],
    },
    {
        key: "불향",
        items: [129],
    },
    {
        key: "새콤달콤",
        items: [319],
    },
    {
        key: "야채",
        items: [313],
    },
];
