function more() {
    let content = document.getElementById("videos__more__content");
    let btn = document.querySelector(".videos__more__btn");
    if (content.style.display === "none") {
        content.style.display = "flex";
        console.log("good");
        btn.remove();
    } else {
        content.style.display = "none";
    }
}
