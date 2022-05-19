import rmnData from "./db/rmn.json";
import fileData from "./db/file.json";
import pkgData from "./db/pkg.json";

//db에서 json추출해서 쓰고있는데, 서버에서 받아오는 로직필요
//서버에서 받아올때 꼭 필요한 항목들
/*
1. pkgSeq //채식라면구별용
2. rmn_nm
3. rmn_seq
4. rmn_info
5. rnm_tag
6. new_yn
7. mnfctr_nm
8. pgm_file_id or Img Path : 이미지URL만 주는게 제일좋은
9. fvNum //좋아하는 숫자
*/

//위에 데이터 받아오면
// score :0 셋팅하고 ormnData_bag으로 export한후에 App.js에서 rbti클래스 init시킬때 패러미터로 넣어주면
// 앱내 라면리스트 및 라면취향테스트 가능
const ormnData = rmnData.rows.map((rmn, idx) => {
    const file = fileData.rows.filter((file) => file.pgm_file_id === rmn.pgm_file_id);
    const pkgSeq = pkgData.rows.filter((item) => item.rmn_seq === rmn.rmn_seq);

    return {
        pkgSeq: pkgSeq[0] ? pkgSeq[0].pkg_seq : "",
        rmn_nm: rmn.rmn_nm,
        rmn_seq: rmn.rmn_seq,
        cate1: rmn.cate1,
        rmn_info: rmn.rmn_info,
        rmn_tag: rmn.rmn_tag,
        pgm_file_id: rmn.pgm_file_id,
        new_yn: rmn.new_yn,
        mnfctr_nm: rmn.mnfctr_nm,
        ...file[0],
        score: 0,
        fvNum: idx * 50, //임의로 인덱스 50곱한수로
    };
});

//봉지라면만
const ormnData_bag = ormnData.filter((item) => item.cate1 === "0100000");
export default ormnData_bag;
