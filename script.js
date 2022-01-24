/*
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
*/

/* Changing header styling based on scroll */

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


/* Making nav links active on scroll */

const sections = document.querySelectorAll("#index section");
const navLinks = document.querySelectorAll("header nav a");

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let id = entry.target.getAttribute("id");

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            document.querySelector('header nav a[href*=' + id + ']')
                .classList.add('active');
        }
    });
}, { 
    root: null,
    threshold: 0.5,
    rootMargin: "-200px 0px 0px -200px"
}
);

sections.forEach(section => {
    sectionObserver.observe(section);
});