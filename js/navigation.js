// JavaScript for navigation

const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

// When someone clicks the hamburger button
navToggle.addEventListener("click", () => {
    const visibility = nav.getAttribute("data-visible");
    
    // if the nav is closed, open it
    if (visibility === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});
