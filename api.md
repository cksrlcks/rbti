# API 요청 리스트

### GET /rmns

-   return [ 라면데이터 : [{}, {}, ...], 설문조사한숫자 : 999 ]
-   [라면데이터에 들어있어야할 항목들]
    pkg_seq - 패키지 넘버
    rmn_nm - 라면이름
    rmn_seq - 라면넘버
    rmn_info - 라면정보
    rmn_tag - 라면태그
    pgm_file_id - 라면이미지주소 파일명
    new_yn - 신상품인지
    mnfctr_nm - 제조사이름
    sellNum - 팔린숫자
    fvNum - 좋아요한 숫자

### POST /rmns

-   설문데이터 저장
-   body : {
    gneder:string(성별),
    age:string(연령대),
    frequency:string(횟수),
    quantity:string(수량),
    name:string(이름),
    pickRmn: array(선택된라면5개),
    attrRmn:string(끌리는라면1개seq),
    answer:array(설문응답결과꾸러미)
    }
-   return 결과저장된 고유 아이디

### GET /rmns/고유아이디

-   저장된 응답결과 가져오기 (post보냇던거 그대로 들고와야함)
-   return {
    gneder:string(성별),
    age:string(연령대),
    frequency:string(횟수),
    quantity:string(수량),
    name:string(이름),
    pickRmn: array(선택된라면5개),
    attrRmn:string(끌리는라면1개seq),
    answer:array(설문응답결과꾸러미)
    }
