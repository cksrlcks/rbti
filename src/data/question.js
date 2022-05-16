import rmnData from "./rmn.json";
import { randomPick } from "../lib/utill";
const randomBagRmn = randomPick(rmnData.rows, 30);

export const rmnQuestion = [
    {
        qId: 1,
        qType: "input",
        title: "테스트에 앞서 닉네임을 입력해주세요",
    },
    {
        qId: 2,
        qType: "radio",
        title: "성별을 알려주세요",
        answerList: [
            {
                label: "남성",
                value: "남성",
            },
            {
                label: "여성",
                value: "여성",
            },
        ],
    },
    {
        qId: 3,
        qType: "radio",
        title: "연령대를 선택해 주세요",
        answerList: [
            {
                label: "10대",
                value: "10",
            },
            {
                label: "20대",
                value: "20",
            },
            {
                label: "30대",
                value: "30",
            },
            {
                label: "40대",
                value: "40",
            },
            {
                label: "50대",
                value: "50",
            },
            {
                label: "60대 이상",
                value: "60",
            },
        ],
    },
    {
        qId: 4,
        qType: "radio",
        title: "나는 일주일에 라면을",
        answerList: [
            {
                label: "주말에만 한 번 정도 먹어요",
                value: "1",
            },
            {
                label: "주 2~3회는 먹는 편이예요",
                value: "2",
            },
            {
                label: "밥보다 라면! 주 3~5회 먹어요",
                value: "3",
            },
            {
                label: "라면 사랑해요❤ 주 5회 이상!",
                value: "4",
            },
            {
                label: "일주일 말고, 한 달에 1~2번 먹어요",
                value: "5",
            },
        ],
    },
    {
        qId: 5,
        qType: "radio",
        title: "나는 한 번 라면 먹을 ",
        answerList: [
            {
                label: "한 개 씩만 끓여 먹어요",
                value: "1",
            },
            {
                label: "두 개 씩 끓여 먹어요",
                value: "2",
            },
            {
                label: "세 개 이상 끓여 먹어요",
                value: "3",
            },
        ],
    },
    {
        qId: 6,
        qType: "order",
        title: "어떤 종류의 라면을 선호하세요?",
        answerList: [
            {
                label: "국물라면",
                value: "국물라면",
            },
            {
                label: "볶음라면",
                value: "볶음라면",
            },
            {
                label: "비빔라면",
                value: "비빔라면",
            },
            {
                label: "짜장라면",
                value: "짜장라면",
            },
        ],
    },
    {
        qId: 7,
        qType: "radio",
        title: "맵부심 있으신가요?",
        answerList: [
            {
                label: "네, 매운 라면을 즐겨 먹어요!",
                value: "매운맛",
            },
            {
                label: "적당히 얼큰한 정도가 좋아요",
                value: "보통맛",
            },
            {
                label: "아니요, 순한맛을 즐겨요!",
                value: "순한맛",
            },
            {
                label: "맵기 상관없이 골고루 먹어요!",
                value: "모두",
            },
        ],
    },
    {
        qId: 8,
        qType: "radio",
        title: "보통 라면이 생각 나는 순간은?",
        answerList: [
            {
                label: "눈물 쏙 매운게 땡길 때",
                value: "매운맛",
            },
            {
                label: "시원~하게 해장이 필요할 때",
                value: "짬뽕라면",
            },
            {
                label: "단짠단짠 자극적인 맛이 땡길 때",
                value: "볶음라면, 짜장라면, 치즈&크림",
            },
            {
                label: "늦은 밤 출출할 때",
                value: "저칼로리, 저나트륨, 건면",
            },
            {
                label: "간단하게 끼니를 때워야 할 때",
                value: "모두",
            },
        ],
    },
    {
        qId: 9,
        qType: "radio",
        title: "라면은 이게 제일 중요해요",
        answerList: [
            {
                label: "후루룩! 쫄깃하고 부드러운 면발",
                value: "면발",
            },
            {
                label: "얼큰하고 시원한 국물",
                value: "국물",
            },
            {
                label: "단짠단짠 자극적인 맛",
                value: "단짠단짠",
            },
            {
                label: "풍부한 후레이크 & 후첨스프들",
                value: "후레이크&후첨",
            },
            {
                label: "계란, 파와 잘 어울리는 라면",
                value: "계란,파",
            },
        ],
    },
    {
        qId: 10,
        qType: "multiOrder",
        max: 3,
        title: "어떤 라면이 제일 맛있을 것 같나요?",
        answerList: [
            {
                label: "김치&고춧가루가 들어간 칼칼한 라면",
                value: "칼칼",
            },
            {
                label: "바다향 물씬 나는 해물맛 라면",
                value: "해물맛",
            },
            {
                label: "짭짤하고 꾸덕한 치즈맛 라면",
                value: "짭잘꾸덕",
            },
            {
                label: "자극이 덜한 맑고 깔끔한 라면",
                value: "맑은라면",
            },
            {
                label: "구수하고 담백한 라면",
                value: "구수담백",
            },
            {
                label: "소시지&고기토핑 라면",
                value: "소시지",
            },
            {
                label: "불향 나는 짬뽕맛 라면",
                value: "불향",
            },
            {
                label: "새콤 or 달콤한  후식용 라면",
                value: "새콤달콤",
            },
            {
                label: "개운한 야채로 맛을 낸 라면",
                value: "야채",
            },
        ],
    },
    {
        qId: 11,
        qType: "radio",
        title: "라면 고를 때 기준은?",
        answerList: [
            {
                label: "내가 좋아하는 라면",
                value: "내가 좋아하는 라면",
            },
            {
                label: "가성비 좋은 라면",
                value: "가성비 좋은 라면",
            },
            {
                label: "신상라면",
                value: "신상라면",
            },
            {
                label: "인기라면",
                value: "인기라면",
            },
            {
                label: "채식성분 라면",
                value: "채식성분 라면",
            },
            {
                label: "저칼로리&저나트륨 라면",
                value: "저칼로리&저나트륨 라면",
            },
        ],
    },
    {
        qId: 12,
        qType: "radio",
        title: "안 먹어 본 라면에 도전하고 싶으세요?",
        answerList: [
            {
                label: "네! 너무 궁금해요",
                value: "네",
            },
            {
                label: "아니요,, 대중성 있는 라면이 좋아요",
                value: "아니요",
            },
            {
                label: "한 번 쯤은 먹어보고 싶어요",
                value: "모두",
            },
        ],
    },
    {
        qId: 13,
        qType: "multi",
        max: 2,
        title: "보통 라면과 무엇을 곁들여 드세요?",
        answerList: [
            {
                label: "밥",
                value: "밥",
            },
            {
                label: "김치",
                value: "김치",
            },
            {
                label: "단무지",
                value: "단무지",
            },
            {
                label: "파/고추/버섯 등 토핑",
                value: "파/고추/버섯 등 토핑",
            },
            {
                label: "안 먹어요",
                value: "안 먹어요",
            },
        ],
    },
    {
        qId: 14,
        qType: "multi",
        max: 2,
        title: "지금 냉장고에 있는 채소는?",
        answerList: [
            {
                label: "계란",
                value: "계란",
            },
            {
                label: "파",
                value: "파",
            },
            {
                label: "고추",
                value: "고추",
            },
            {
                label: "소세지",
                value: "소세지",
            },
            {
                label: "다진 마늘",
                value: "다진 마늘",
            },
            {
                label: "콩나물",
                value: "콩나물",
            },
            {
                label: "치즈",
                value: "치즈",
            },
            {
                label: "없어요",
                value: "없어요",
            },
        ],
    },
    {
        qId: 15,
        qType: "rmn_mulit",
        max: 3,
        title: "지금 제일 끌리는 라면을 선택해 주세요",
        answerList: randomBagRmn,
    },
];
