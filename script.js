/*
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
*/
const header = document.getElementById("header1");
const hero = document.getElementById("hero");

const heroObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            header.classList.add("nav-scrolled");
        } else {
            header.classList.remove("nav-scrolled");
        }
    });
}, { 
    root: null,
    threshold: 0.0,
    rootMargin: "-200px 0px 0px 0px"
}
);

heroObserver.observe(hero);
