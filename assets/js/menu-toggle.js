// menu-toggle.js
export function initializeMenuToggle() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    } else {
        console.warn("Hamburger or menu element not found.");
    }
}