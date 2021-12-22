// d-day countdown
const dday = document.querySelector(".nav__d-day");
function getTime() {
    const electionDay = new Date("2022-03-09:00:00:00+0900");
    const now = new Date();
    const gap = electionDay - now;
    const day = Math.floor(gap / (1000 * 60 * 60 * 24));
    dday.innerText = `D-${day}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}
init();

// video more
function more() {
    let content = document.getElementById("videos__more__content");
    let btn = document.querySelector(".videos__more__btn");
    if (content.style.display == "") {
        content.style.display = "flex";
        btn.remove();
    }
}

const toggleBtn = document.querySelector(".nav__toggleBtn");
const list = document.querySelector(".nav__links");
toggleBtn.addEventListener("click", () => {
    list.classList.toggle("active");
});

// api fetch
const port = "elice-kdt-sw-1st-vm11.koreacentral.cloudapp.azure.com:5000";
const mainColor = {
    "%EC%9D%B4%EC%9E%AC%EB%AA%85": "#6399da",
    "%EC%9C%A4%EC%84%9D%EC%97%B4": "#df6962",
    "%EC%8B%AC%EC%83%81%EC%A0%95": "#ebbf5c",
    "%EC%95%88%EC%B2%A0%EC%88%98": "#e88c4e",
};
const profilePicture = {
    "%EC%9D%B4%EC%9E%AC%EB%AA%85": "../imgs/big-01.png",
    "%EC%9C%A4%EC%84%9D%EC%97%B4": "../imgs/big-02.png",
    "%EC%8B%AC%EC%83%81%EC%A0%95": "../imgs/big-03.png",
    "%EC%95%88%EC%B2%A0%EC%88%98": "../imgs/big-04.png",
};

function getJobData(arr) {
    let result = [];
    for (const key of arr) {
        result.push(key.desc);
    }
    return result;
}

function getPromiseData(arr) {
    const conboxUl = document.querySelector(".conbox__ul");
    for (const key of arr) {
        let list = document.createElement("li");
        let category = document.createElement("div");
        category.className = "conbox__title";
        category.innerText = key.category;
        conboxUl.appendChild(list);
        list.appendChild(category);
        for (const promise of key.data) {
            let content = document.createElement("div");
            content.className = "conbox__content";
            content.innerText = promise;
            list.appendChild(content);
        }
    }
}

let partyName = document.querySelector(".member__party_name");
let memberName = document.querySelector(".member__name");
let memberPhoto = document.querySelector(".member__image img");
let memberBackgroundColor = document.querySelector(".members");

let birthInfo = document.querySelector(".birth dd");
let familyInfo = document.querySelector(".family dd");
let eduInfo = document.querySelector(".edu dd");
let jobInfo = document.querySelector(".job dd");
let propertyInfo = document.querySelector(".property dd");
let armyInfo = document.querySelector(".army dd");
let convictionInfo = document.querySelector(".conviction dd");

let encodedName = "";
function fetchPage(name) {
    encodedName = encodeURIComponent(name);
    fetch(`http://${port}/api/candidate/${encodedName}`)
        .then((res) => res.json())
        .then((data) => {
            partyName.innerText = data.party;
            memberName.innerText = data.name;
            birthInfo.innerText = data.birth;
            familyInfo.innerText = `${data.family} ${data.companion}`;
            eduInfo.innerHTML = data.edu.join("<br>");
            jobInfo.innerHTML = getJobData(data.carrier).join("<br>");
            propertyInfo.innerText = data.property;
            armyInfo.innerText = data.army;
            convictionInfo.innerHTML = data.conviction.join("<br>");
            memberPhoto.setAttribute("src", profilePicture[name]);
            memberBackgroundColor.setAttribute(
                "style",
                `background-color: ${mainColor[name]};`
            );
        })
        .catch((err) => console.error(err));

    fetch(`http://${port}/api/promise/${encodedName}`)
        .then((res) => res.json())
        .then((data) => {
            getPromiseData(data);
        })
        .catch((err) => console.error(err));
}

fetchPage(location.href.split("?")[1]);
