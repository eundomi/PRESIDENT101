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

function more() {
    let content = document.getElementById("videos__more__content");
    let btn = document.querySelector(".videos__more__btn");
    if (content.style.display == "") {
        content.style.display = "flex";
        btn.remove();
    } else {
        content.style.display = "none";
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
    이재명: "#6399da",
    윤석열: "#df6962",
    ShimSangJung: "#ebbf5c",
    AhnCheolSoo: "#e88c4e",
};

const profilePicture = {
    이재명: "../imgs/big-01.png",
    윤석열: "../imgs/big-02.png",
    심상정: "../imgs/big-03.png",
    안철수: "../imgs/big-04.png",
};

const partyName = document.querySelector(".member__party_name");
const memberName = document.querySelector(".member__name");

const memberBackgroundColor =
    document.querySelector(".members").style.backgroundColor;

const birthInfo = document.querySelector(".birth dd");
const familyInfo = document.querySelector(".family dd");
const eduInfo = document.querySelector(".edu dd");
const jobInfo = document.querySelector(".job dd");
const propertyInfo = document.querySelector(".property dd");
const armyInfo = document.querySelector(".army dd");
const convictionInfo = document.querySelector(".conviction dd");

let encodedName = "";
function fetchPage(name) {
    encodedName = encodeURIComponent(name);
    let engName = "";

    engName = location.hash.substr(1);
    console.log(engName);

    fetch(`http://${port}/api/candidate/${encodedName}`)
        .then((res) => res.json())
        .then((data) => {
            partyName.innerText = data.party;
            memberName.innerText = data.name;
            birthInfo.innerText = data.birth;
            familyInfo.innerText = `${data.family}      ${data.companion}`;
            eduInfo.innerHTML = data.edu.join("<br>");
            jobInfo.innerHTML = data.carrier;
            propertyInfo.innerText = data.property;
            armyInfo.innerText = data.army;
            convictionInfo.innerHTML = data.conviction.join("<br>");
        })
        .catch((err) => console.error(err));
}

// function fetchPage(name) {
//     encodedName = encodeURIComponent(name);
//     fetch(`http://${port}/api/candidate/${encodedName}`)
//         .then((res) => res.json())
//         .then((data) => {
//             obj = data;
//         })
//         .then(() => console.log(obj));
// }
