const dday = document.querySelector(".nav__d-day");
function getTime() {
    const electionDay = new Date("2022-03-09:00:00:00+0900");
    const now = new Date();
    const gap = electionDay - now;
    const day = Math.floor(gap / (1000 * 60 * 60 * 24));

    dday.innerText = `D-${day}`;
}
getTime();

function more() {
    let content = document.getElementById("videos__more__content");
    let btn = document.querySelector(".videos__more__btn");
    if (content.style.display == "none") {
        content.style.display = "flex";
        console.log("good");
        btn.remove();
    } else {
        content.style.display = "none";
    }
}
