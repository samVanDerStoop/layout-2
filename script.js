/*
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
*/

/* Set up observer for changing header styling based on scroll */

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

/* Set up observers for making nav links and sections active on scroll */

const sections = document.querySelectorAll("#index section");
const navLinks = document.querySelectorAll("header nav a");

const smallScreenOptions = { 
    root: null,
    threshold: 0,
    rootMargin: "-150px 0px -150px 0px"
};
const mediumScreenOptions = { 
    root: null,
    threshold: 0,
    rootMargin: "-250px 0px -250px 0px"
};
const largeScreenOptions = { 
    root: null,
    threshold: 0,
    rootMargin: "-300px 0px -300px 0px"
};

const sectionObserverFunction = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let id = entry.target.getAttribute("id");

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            document.querySelector('header nav a[href*=' + id + ']')
                .classList.add('active');
            
            entry.target.classList.add("active");
        } else {
            entry.target.classList.remove("active");
        }
    });
};


const sectionObserverLargeScreen = new IntersectionObserver(sectionObserverFunction, largeScreenOptions);
const sectionObserverMediumScreen = new IntersectionObserver(sectionObserverFunction, mediumScreenOptions);
const sectionObserverSmallScreen = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        } else {
            entry.target.classList.remove("active");
        }
    });
}, 
smallScreenOptions);

/* Manage correct observers based on window sizing */

function activateSectionObserver(sectionCollection, observer) {
    for (let i = 0; i < sectionCollection.length; i++) {
        observer.observe(sectionCollection[i]);
    }
};
function deactivateSectionObserver(sectionCollection, observer) {
    for (let i = 0; i < sectionCollection.length; i++) {
        observer.unobserve(sectionCollection[i]);
    }
};

function checkWindowWidthMatches(largeWidth, mediumWidth) {
    if (mediumWidth.matches && largeWidth.matches) {
            deactivateSectionObserver(sections, sectionObserverSmallScreen);
            deactivateSectionObserver(sections, sectionObserverMediumScreen);

            heroObserver.observe(hero);
            activateSectionObserver(sections, sectionObserverLargeScreen);
    } else if (mediumWidth.matches) {
            heroObserver.unobserve(hero);
            deactivateSectionObserver(sections, sectionObserverSmallScreen);
            deactivateSectionObserver(sections, sectionObserverLargeScreen);

            activateSectionObserver(sections, sectionObserverMediumScreen);
    } else {
            heroObserver.unobserve(hero);
            deactivateSectionObserver(sections, sectionObserverMediumScreen);
            deactivateSectionObserver(sections, sectionObserverLargeScreen);

            activateSectionObserver(sections, sectionObserverSmallScreen);
    }  
};

const mediumWindowWidth = window.matchMedia("only screen and (min-width: 600px)");
const largeWindowWidth = window.matchMedia("only screen and (min-width: 1024px)");

mediumWindowWidth.addListener(windowWidth => {
    checkWindowWidthMatches(
        window.matchMedia("only screen and (min-width: 1024px)"), 
        windowWidth
        );
});

largeWindowWidth.addListener(windowWidth => {
    checkWindowWidthMatches(
        windowWidth, 
        window.matchMedia("only screen and (min-width: 600px)")
        );
});


checkWindowWidthMatches(largeWindowWidth, mediumWindowWidth);
