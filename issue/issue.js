//후보자들 정보
const candidates = [
    {
        id: "leejaemyung",
        name: "이재명",
        party: "더불어민주당",
        circleImgUrl: "../img/small-01.png",
        profileImgUrl: "../img/lee_profile.png",
        profileId: "option__lee_profile",
        issueClass: "issue__background-0",
        issueAgreeId: "issue__agree_0",
    },
    {
        id: "yoonseokryeol",
        name: "윤석열",
        party: "국민의힘",
        circleImgUrl: "../img/small-02.png",
        profileImgUrl: "../img/yoon_profile.png",
        profileId: "option__yoon_profile",
        issueClass: "issue__background-1",
        issueAgreeId: "issue__agree_1",
    },
    {
        id: "shimsangjung",
        name: "심상정",
        party: "정의당",
        circleImgUrl: "../img/small-03.png",
        profileImgUrl: "../img/shim_profile.png",
        profileId: "option__shim_profile",
        issueClass: "issue__background-2",
        issueAgreeId: "issue__agree_2",
    },
    {
        id: "ahncheolsoo",
        name: "안철수",
        party: "국민의당",
        circleImgUrl: "../img/small-04.png",
        profileImgUrl: "../img/ahn_profile.png",
        profileId: "option__ahn_profile",
        issueClass: "issue__background-3",
        issueAgreeId: "issue__agree_3",
    },
];

//fetch
let keyword1Left;

const url = "elice-kdt-sw-1st-vm11.koreacentral.cloudapp.azure.com:5000";

const issueFetch = async (name) => {
    const response = await fetch(
        `http://${url}/api/candidate/issue/${encodeURIComponent(name)}`
    );
    return await response.json();
};
issueFetch(candidates[1].name);

// 후보자 동그라미 프로필 작성
function memberLink() {
    const member = document.getElementsByClassName("members__nav__content")[0];

    for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        member.innerHTML += `
        <li class="member__link" onclick="optionClick('${candidate.id}')">
            <a href="javascript:void(0);" class="member__circle_profile">
                <img id="${candidate.id}" width="40px" src=${candidate.circleImgUrl} alt="${candidate.name} 프로필" />
                <span class="member__circle_profile__name">${candidate.name}</span>
            </a>
    </li>`;
    }
}

/* 후보 옵션 선택 시, 해당 후보자의 정보 뿌려주기 */

let memberArray = ["leejaemyung", "yoonseokryeol"];

//클릭된 후보가 선택인지 선택해제인지 확인
function optionClick(pickMember) {
    let pickMemberIndex = memberArray.indexOf(pickMember);
    let candidateIndex = candidates.findIndex((i) => i.id == pickMember);

    if (pickMemberIndex != -1) {
        memberArray[pickMemberIndex] = null;
        optionDataDelete(pickMemberIndex, candidates[candidateIndex]);
    } else {
        if (memberArray[0] == null) {
            memberArray[0] = pickMember;
            optionDataChange(0, candidates[candidateIndex]);
            return issueContentChange(0, candidates[candidateIndex]);
        } else {
            memberArray[1] = pickMember;
            optionDataChange(1, candidates[candidateIndex]);
            return issueContentChange(1, candidates[candidateIndex]);
        }
    }
}

//선택된 후보정보 뿌려주기
function optionDataChange(optionIndex, pickCandidate) {
    if (optionIndex == 0) {
        let optionScreen = document.getElementsByClassName(
            "option__screen_left"
        )[0];
        optionScreen.id = `${pickCandidate.profileId}_left`;
        optionScreen.innerHTML = `<div class="option__screen_left_image">
        <img
            src="${pickCandidate.profileImgUrl}"
            alt="${pickCandidate.name} 프로필"
        />
    </div>
    <div class="option__text">
        <p class="option__party option__party_left">${pickCandidate.party}</p>
        <h3 class="option__name option__name_left">${pickCandidate.name}</h3>
    </div>`;
    } else {
        let optionScreen = document.getElementsByClassName(
            "option__screen_right"
        )[0];
        optionScreen.id = `${pickCandidate.profileId}_right`;
        optionScreen.innerHTML = `<div class="option__text">
        <p class="option__party option__party_right">${pickCandidate.party}</p>
        <h3 class="option__name option__name_right">${pickCandidate.name}</h3>
    </div>
        <div class="option__screen_right_image">
        <img
            src="${pickCandidate.profileImgUrl}"
            alt="${pickCandidate.name} 프로필"
        />
    </div>
    `;
    }
}

//선택해제된 후보정보 삭제하기
function optionDataDelete(optionIndex, pickCandidate) {
    if (optionIndex == 0) {
        let optionScreen = document.getElementsByClassName(
            "option__screen_left"
        )[0];
        optionScreen.id = "option__none_left";
        optionScreen.innerHTML = `<div class="option__screen_left_image">
        <img
            src="../img/none-people.png"
            alt="빈 프로필"
        />
    </div>
    <div class="option__text">
        <p class="option__party">비교할 후보자를 </br> 선택해 주세요</p>
    </div>`;
    } else {
        let optionScreen = document.getElementsByClassName(
            "option__screen_right"
        )[0];
        optionScreen.id = "option__none_right";
        optionScreen.innerHTML = `<div class="option__text">
        <p class="option__party">비교할 후보자를 </br> 선택해 주세요</p>
    </div>
        <div class="option__screen_right_image">
        <img
            src="../img/none-people.png"
            alt="빈 프로필"
        />
    </div>
    `;
    }
}

/* 쟁점이슈 키워드 */
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

//쟁점이슈 키워드버튼 생성
function keywordSection() {
    const keywords = document.getElementsByClassName("keywords__section")[0];

    for (let i = 0; i < issueKeywords.length; i++) {
        keywords.innerHTML += `<button class="keywords__button" id="keyword__scroll-${i}" onclick="keywordClick(${i})" style='cursor:pointer'>${issueKeywords[i]} </button>`;
    }
}

//쟁점이슈 내용 초기 작성
function issueContents() {
    const issueSection = document.getElementsByClassName("issue__section")[0];

    for (let i = 0; i < issueKeywords.length; i++) {
        issueSection.innerHTML += `
        <div class="division"></div>
        <div class="issue__keyword" id="keyword__keyword_scroll-${i}">${issueKeywords[i]}</div>
        <div class="issue__candidates">
            <div class="issue__candidate-left issue__profile-left-${i}">
                <img src="${candidates[0].circleImgUrl}" alt="${candidates[0].name}" class="issue__circle_img" width=40px>
                <span>${candidates[0].party}</span>
                <span>${candidates[0].name}</span>
            </div>
            <div class="issue__candidate-right issue__profile-right-${i}">
                <span>${candidates[1].party}</span>
                <span>${candidates[1].name}</span>
                <img src="${candidates[1].circleImgUrl}" alt="${candidates[1].name}" class="issue__circle_img" width=40px>
            </div>
        </div>
        <div class="issue__contents">
            <div class="issue__content_candidate-01 issue__content-left-${i}" id="issue__background-0">
                <p>API</p>
            </div>
            <div class="issue__content_candidate-02 issue__content-right-${i}" id="issue__background-1">
                <p>API</p>
            </div>
        </div>
        <div class="issue__agree">
                    <input
                        type="button"
                        class="issue__agree_button"
                        id="issue__agree_button_left"
                        onclick="issueAgree()"
                        style='cursor:pointer'
                        value="👍"
                    />
                    <div class=issue__agree_bar>
                        <div class="issue__agree_candidate-left">
                            <div class="issue__agree_0">50%</div>
                        </div>
                        <div class="issue__agree_candidate-right">
                            <div class="issue__agree_1">50%</div>
                        </div>
                    </div>
                    <input
                    type="button"
                    class="issue__agree_button"
                    id="issue__agree_button_right"
                    onclick="issueAgree()"
                    style='cursor:pointer'
                    value="👍"
                />
                </div>`;
    }
    issueContentChange(0, candidates[0]);
    issueContentChange(1, candidates[1]);
}

//쟁점이슈 내용 변경
async function issueContentChange(optionIndex, pickCandidate) {
    let direcrion = "right";
    if (optionIndex == 0) {
        direcrion = "left";
    }
    let contents = await issueFetch(pickCandidate.name);
    console.log(contents);
    for (let i = 0; i < issueKeywords.length; i++) {
        const issueProfile = document.getElementsByClassName(
            `issue__profile-${direcrion}-${i}`
        )[0];
        const issueContent = document.getElementsByClassName(
            `issue__content-${direcrion}-${i}`
        )[0];
        const issueAgree = document.getElementsByClassName(
            `issue__agree_candidate-${direcrion}`
        )[i];

        const keyword = document.getElementById(`keyword__keyword_scroll-${i}`);
        const content = contents.find(
            (content) => content.category === keyword.textContent
        );

        if (direcrion === "left") {
            issueProfile.innerHTML = `
                    <img src="${pickCandidate.circleImgUrl}" alt="${pickCandidate.name}" class="issue__circle_img" width="40px">
                    <span>${pickCandidate.party}</span>
                    <span>${pickCandidate.name}</span>`;
        } else {
            issueProfile.innerHTML = `
            <span>${pickCandidate.party}</span>
            <span>${pickCandidate.name}</span>
            <img src="${pickCandidate.circleImgUrl}" alt="${pickCandidate.name}" class="issue__circle_img" width=40px>`;
        }

        issueContent.id = `${pickCandidate.issueClass}`;
        issueContent.innerHTML = content
            ? `<h4>${content.title}</h4><br><p>${content.desc}</p></br><p>${content.source}</p>`
            : `<p>죄송하지만 해당 쟁점에 대한 후보자의 입장이 확인되지 않습니다.</p>`;
        issueAgree.innerHTML = `<div class="${pickCandidate.issueAgreeId}">50%</div>`;
    }
}

//쟁점이슈 키워드 클릭 시 해당 구간으로 이동
function keywordClick(index) {
    let pickKeyword = document.getElementById(
        `keyword__keyword_scroll-${index}`
    ).offsetTop;
    console.log(pickKeyword);
    console.log(index);
    window.scroll({ top: pickKeyword, behavior: "auto" });
}

window.onload = function () {
    memberLink();
    keywordSection();
    optionDataChange(0, candidates[0]);
    optionDataChange(1, candidates[1]);
    issueContents();
};
