//about us tabs

const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

tabLinks.forEach((tabLink) => {
  tabLink.addEventListener("click", (e) => {
    for (tabLink of tabLinks) {
      tabLink.classList.remove("active");
    }
    for (tabContent of tabContents) {
      tabContent.classList.remove("active");
    }

    e.target.classList.add("active");
    let tab = e.target.getAttribute("data-tab");
    document.getElementById(tab).classList.add('active')

  });
});

// img slider

const slides = document.querySelectorAll(".slide");
const slideNavigationButtons = document.querySelectorAll(
  ".slide-navigation-btn"
);
let currentSlide = 1;

const manualNavigation = (manual) => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideNavigationButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  slides[manual].classList.add("active");
  slideNavigationButtons[manual].classList.add("active");
};

slideNavigationButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNavigation(i);
    currentSlide = i;
  });
});

// const repeat = () => {
//   let active = document.getElementsByClassName("active");
//   let i = 1;

//   const repeater = () => {
//     setTimeout(function () {
//       [...active].forEach((activeSlide) => {
//         activeSlide.classList.remove("active");
//       });
//       slides[i].classList.add("active");
//       slideNavigationButtons[i].classList.add("active");
//       i++;

//       if (i >= slides.length) {
//         i = 0;
//       }
//       repeater();
//     }, 2000);
//   };
//   repeater();
// };
// repeat();
