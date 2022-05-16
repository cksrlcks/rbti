import rmnData from "./db/rmn.json";
import fileData from "./db/file.json";
import pkgData from "./db/pkg.json";

const ormnData = rmnData.rows.map((rmn) => {
    const file = fileData.rows.filter((file) => file.pgm_file_id === rmn.pgm_file_id);
    const pkgSeq = pkgData.rows.filter((item) => item.rmn_seq === rmn.rmn_seq);

    return {
        pkgSeq: pkgSeq[0] ? pkgSeq[0].pkg_seq : "",
        rmn_nm: rmn.rmn_nm,
        food_type: rmn.food_type,
        rmn_seq: rmn.rmn_seq,
        cate1: rmn.cate1,
        cate2: rmn.cate2,
        cate3: rmn.cate3,
        rmn_info: rmn.rmn_info,
        rmn_tag: rmn.rmn_tag,
        pgm_file_id: rmn.pgm_file_id,
        new_yn: rmn.new_yn,
        ...file[0],
        score: 0,
    };
});

//봉지라면만
const ormnData_bag = ormnData.filter((item) => item.cate1 === "0100000");
export default ormnData_bag;
