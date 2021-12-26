const timerContainer = document.querySelector(".main_d-day"),
  timer = timerContainer.querySelector("h3");

function getTime() {
  const electionDay = new Date("2022-03-09:00:00:00+0900");
  const now = new Date();
  const gap = electionDay - now;
  const day = Math.floor(gap / (1000 * 60 * 60 * 24));

  timer.innerText = `D-${day}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();

const toggleBtn = document.querySelector(".nav__burger");
const navbar = document.querySelector(".nav__bar");
const links = document.querySelector(".nav__links");
const reg = document.querySelector(".nav__reg");

toggleBtn.addEventListener("click", () => {
  console.log("suss");
  links.classList.toggle("nav-active");
  reg.classList.toggle("nav-active");
  navbar.classList.toggle("nav-active");
});

var li = document.querySelector(".nav__reg li");
const log = document.querySelector(".nav__reg");

const port =
  "http://elice-kdt-sw-1st-vm11.koreacentral.cloudapp.azure.com:5000";

fetch(`${port}/api/user/payload`, {
  method: "GET",
  redirect: "follow",
  credentials: "include",
})
  .then((res) => res.json())
  .then((result) => {
    if (result.userName) {
      log.innerHTML = `<li><a>${result.userName}님</a></li>`;
      log.onclick = function () {
        if (log.children.length === 2) return;
        swal({
          title: "로그아웃 하시겠습니까?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((logout) => {
          if (logout) {
            swal("로그아웃 완료되었습니다.", {
              icon: "success",
            }).then(() => {
              fetch(`${port}/api/user/logout`, {
                method: "GET",
                redirect: "follow",
                credentials: "include",
              });
              log.innerHTML = `<li><a href="/president101/html/login.html">로그인</a></li>
              <li><a href="/president101/html/register.html">회원가입</a></li>`;
            });
          }
        });
      };
    } else {
    }
  })
  .catch((err) => {
    console.log(err);
  });
