// JavaScript for tabs

const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    // Update the selected tab
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);
    targetTab.setAttribute("aria-selected", true);

    // Get all panels and images
    const allPanels = mainContainer.querySelectorAll('[role="tabpanel"]');
    const allImages = mainContainer.querySelectorAll('picture');

    // Get the target panel and image
    const targetPanelElement = mainContainer.querySelector(`#${targetPanel}`);
    const targetImageElement = mainContainer.querySelector(`#${targetImage}`);

    // Fade out all panels and images except the target ones
    allPanels.forEach(panel => {
        if (panel.id !== targetPanel) {
            fadeOut(panel);
        }
    });

    allImages.forEach(image => {
        if (image.id !== targetImage) {
            fadeOut(image);
        }
    });

    // Show and fade in the target panel and image
    targetPanelElement.removeAttribute('hidden');
    targetImageElement.removeAttribute('hidden');

    fadeIn(targetPanelElement);
    fadeIn(targetImageElement);
}

function fadeOut(element) {
    // Only apply animation to elements with these classes
    if (element.classList.contains('crew-image') ||
        element.classList.contains('crew-details') ||
        element.classList.contains('destination-image') ||
        element.classList.contains('destination-info') ||
        element.classList.contains('technology-image') ||
        element.classList.contains('technology-details')) {

        // Fade out
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';

        // Hide after animation completes
        setTimeout(() => {
            element.setAttribute('hidden', true);
        }, 300);
    } else {
        // For other elements, just hide immediately
        element.setAttribute('hidden', true);
    }
}

function fadeIn(element) {
    // Only apply animation to elements with these classes
    if (element.classList.contains('crew-image') ||
        element.classList.contains('crew-details') ||
        element.classList.contains('destination-image') ||
        element.classList.contains('destination-info') ||
        element.classList.contains('technology-image') ||
        element.classList.contains('technology-details')) {

        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';

        // Force a reflow to ensure the initial state is applied
        void element.offsetWidth;

        // Fade in
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
}
