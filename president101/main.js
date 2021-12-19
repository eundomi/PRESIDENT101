const timerContainer=document.querySelector(".main_d-day"),
    timer=timerContainer.querySelector("h3");

function getTime() {
  const electionDay = new Date("2022-03-09:00:00:00+0900");
  const now=new Date();
  const gap=electionDay-now;
  const day=Math.floor(gap/(1000*60*60*24));
  
  timer.innerText=`D-${day}`;
}

function init() {
    getTime();
    setInterval(getTime,1000);
}
init();

const toggleBtn=document.querySelector('.nav__burger');
const navbar=document.querySelector('.nav__bar');
const links=document.querySelector('.nav__links');
const reg=document.querySelector('.nav__reg');

toggleBtn.addEventListener('click',()=>{
    console.log("suss");
    links.classList.toggle('nav-active');
    reg.classList.toggle('nav-active');
    navbar.classList.toggle('nav-active');
    
});
