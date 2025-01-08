const hamburgerButton = document.getElementById("hamburger-button");
const hamburgerMenu = document.getElementById("hamburger-menu");
const hamburgerCloseButton = document.getElementById("hamburger-close-button");
const hamburgerMenuLinks = hamburgerMenu.querySelectorAll("a");
hamburgerButton.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("hamburger-menu__open");
});
hamburgerCloseButton.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("hamburger-menu__open");
});
hamburgerMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("hamburger-menu__open");
  });
});
