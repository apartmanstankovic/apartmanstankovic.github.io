// about us tabs

const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");
const imgSliders = document.querySelectorAll(".apartment-img-slider");

tabLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    for (tabLink of tabLinks) {
      tabLink.classList.remove("active");
    }
    for (tabContent of tabContents) {
      tabContent.classList.remove("active");
    }
    for (imgSlider of imgSliders) {
      imgSlider.classList.remove("active");
    }

    e.target.classList.add("active");
    let tab = e.target.getAttribute("data-tab");
    document.getElementById(tab).classList.add("active");

    imgSliders.forEach((slider) => {
      let attribute = slider.getAttribute("data-slider");
      if (attribute == tab) {
        slider.classList.add("active");
      }
      slider.querySelector(".apartment-slide").classList.add("active");
      slider.querySelector(".slide-navigation-btn").classList.add("active");
    });
  });
});

// img slider

const slides = document.querySelectorAll(".apartment-slide");
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

// full img slider

const fullImg = document.querySelector(".full-img");
const resortImg = document.querySelectorAll(".resort-slide");
const closeFull = document.querySelector(".close-full");
const resortFigures = document.querySelectorAll("figure");

let imgIndex;

resortImg.forEach((img) =>
  img.addEventListener("click", () => {
    let src = img.getAttribute("src");
    document.querySelector(".full").style.display = "flex";
    fullImg.setAttribute("src", src);
    imgIndex = img.parentElement.getAttribute("data-index");
  })
);

const incrementImg = () => {
  imgIndex++;
  if (imgIndex > resortFigures.length) {
    imgIndex = 1;
  }
  console.log(imgIndex)

  let imgSrc = document
    .querySelector(`[data-index="${imgIndex}"]`)
    .querySelector(".resort-slide")
    .getAttribute("src");
  fullImg.setAttribute("src", imgSrc);
};

const decrementImg = () => {
  imgIndex--;
  if (imgIndex < 1) {
    imgIndex = resortFigures.length;
  }
  console.log(imgIndex)
  let imgSrc = document
    .querySelector(`[data-index="${imgIndex}"]`)
    .querySelector(".resort-slide")
    .getAttribute("src");
  fullImg.setAttribute("src", imgSrc);
};

closeFull.addEventListener("click", () => {
  document.querySelector(".full").style.display = "none";
});
