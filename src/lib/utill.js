export const randomPick = (array, number) => {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array.slice(0, number);
};

export const sortData = function (data, key, type) {
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

export const stringToArray = function (string) {
    return string
        .split(",")
        .map((element) => element.trim())
        .filter((element) => element !== "");
};

export const organizeArray = function (array) {
    //배열의 앞뒤공백, 중복제거
    return array.map((element) => element.trim()).filter((element) => element !== "");
};

export const createMarkup = function (string) {
    return { __html: string };
};

export const createImgUrl = function (name) {
    return `https://www.oramyun.com/data/SITE000001/ORMN_RMN/${name}.png`;
};
