//node로 임시 데이터 만들엇습니다.

const rmnData = require("./db/rmn.json");
const fileData = require("./db/file.json");
const pkgData = require("./db/pkg.json");
const fs = require("fs");

const fullList = rmnData.rows.map((rmn, idx) => {
    const file = fileData.rows.filter((file) => file.pgm_file_id == rmn.pgm_file_id);
    const pkg_seq = pkgData.rows.filter((item) => item.rmn_seq == rmn.rmn_seq).map((item) => item.pkg_seq);

    return {
        pkg_seq: pkg_seq,
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
        sellNum: idx * 1, //임의로
        fvNum: idx * 50, //임의로 인덱스 50곱한수로
    };
});

const rmnList = JSON.stringify(fullList);

fs.writeFile("./public/db.json", rmnList, function (err) {
    if (err) console.log(err);
});
