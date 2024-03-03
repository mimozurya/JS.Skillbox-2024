const button = document.querySelector(".btn");

button.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

window.onscroll = () => {
    button.style.opacity = window.scrollY > 500 ? 1 : 0;
};
