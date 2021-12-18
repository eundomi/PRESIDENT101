// 후보자 동그라미 프로필 작성
const candidates = [
    {
        id: "leejaemyung",
        name: "이재명",
        imgUrl: "../img/small-01.png",
    },
    {
        id: "yoonseokryeol",
        name: "윤석열",
        imgUrl: "../img/small-02.png",
    },
    {
        id: "shimsangjung",
        name: "심상정",
        imgUrl: "../img/small-03.png",
    },
    {
        id: "ahncheolsoo",
        name: "안철수",
        imgUrl: "../img/small-04.png",
    },
];

function memberLink() {
    const member = document.getElementsByClassName("members__nav__content")[0];

    for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        member.innerHTML += `
        <li class="member__link" onclick="">
            <a href="#" class="member__circle_profile">
                <img id="${candidate.id}}" width="40px" src=${candidate.imgUrl} alt="${candidate.name} 프로필" />
                <span class="member__circle_profile__name">${candidate.name}</span>
            </a>
    </li>`;
    }
}

// 쟁점이슈 키워드들 작성

const issueKeywords = [
    "n번방 방지법",
    "종전선언",
    "부동산 세제",
    "주택 공급",
    "임대차 3법",
    "탈원전",
    "외교 기조",
    "북핵 문제",
    "모병제",
    "일ㆍ양육 양립",
    "남녀 임금 격차",
    "여성가족부 존폐",
    "성범죄 방지",
];

function keywordSection() {
    const keywords = document.getElementsByClassName("keywords_section")[0];

    for (let i = 0; i < issueKeywords.length; i++) {
        if (i == 0) {
            keywords.innerHTML += `<input type="radio" name="keyword" id="keyword-${
                i + 1
            }" checked/>
            <label for="keyword-${i + 1}"> ${issueKeywords[i]} </label>`;
        } else {
            keywords.innerHTML += `<input type="radio" name="keyword" id="keyword-${
                i + 1
            }" />
                <label for="keyword-${i + 1}"> ${issueKeywords[i]} </label>`;
        }
    }
}

window.onload = function () {
    memberLink();
    keywordSection();
};
