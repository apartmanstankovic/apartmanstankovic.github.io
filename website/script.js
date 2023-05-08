// About Us

// about us slider

const apartmentImg = document.querySelector(".apartment-img");
const apartmentImages = [
  ["./images/1.jpeg", "./images/2.jpeg", "./images/3.jpg", "./images/4.jpg"],
  ["./images/5.jpg", "./images/6.jpg", "./images/7.jpg", "./images/8.jpg"],
  ["./images/3.jpg", "./images/9.jpg", "./images/2.jpeg", "./images/1.jpeg"],
];

let imgNum = 0;

const next = () => {
  let parent = event.target.closest(".apartment-slider");
  let tabImages = +parent.getAttribute("data-tabIndex");
  imgNum++;
  if (imgNum > apartmentImages[tabImages].length - 1) {
    imgNum = 0;
  }
  apartmentImg.src = apartmentImages[tabImages][imgNum];
};

const prev = () => {
  let parent = event.target.closest(".apartment-slider");
  let tabImages = +parent.getAttribute("data-tabIndex");
  imgNum--;
  if (imgNum < 0) {
    imgNum = apartmentImages[tabImages].length - 1;
  }
  apartmentImg.src = apartmentImages[tabImages][imgNum];
};

// about us tabs

const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");
const imgSlider = document.querySelector(".apartment-slider");
const mapSection = document.querySelector(".map")

tabLinks.forEach((tabLink) => {
  tabLink.addEventListener("click", (e) => {
    let tabIndex = tabLink.getAttribute("data-tabLink") - 1;
    imgSlider.setAttribute("data-tabIndex", tabIndex);
    if(tabIndex === 3) {
      imgSlider.style.display = "none"
      mapSection.style.display = "block"
    }
    else {
      imgSlider.style.display = "block"
      mapSection.style.display = "none"
      imgSlider
      .querySelector("img")
      .setAttribute("src", apartmentImages[tabIndex][0]);
    }

    for (link of tabLinks) {
      link.classList.remove("active");
    }
    for (content of tabContents) {
      content.classList.remove("active");
    }

    e.target.classList.add("active");
    let tab = e.target.getAttribute("data-tabLink");
    let tabContent = document.querySelector(`[data-tabContent="${tab}"]`);
    tabContent.classList.add("active");
  });
});

// full img slider

// const fullImg = document.querySelector(".full-img");
// const img = document.querySelectorAll(".img");
// const closeFull = document.querySelector(".close-full");
// const resortFigures = document.querySelectorAll("figure");

// let imgIndex;

// img.forEach((img) =>
//   img.addEventListener("click", () => {
//     let src = img.getAttribute("src");
//     document.querySelector(".full").style.display = "flex";
//     fullImg.setAttribute("src", src);
//     imgIndex = img.parentElement.getAttribute("data-index");
//   })
// );

// const incrementImg = () => {
//   imgIndex++;
//   if (imgIndex > resortFigures.length) {
//     imgIndex = 1;
//   }

//   let imgSrc = document
//     .querySelector(`[data-index="${imgIndex}"]`)
//     .querySelector(".rotate-slide")
//     .getAttribute("src");
//   fullImg.setAttribute("src", imgSrc);
// };

// const decrementImg = () => {
//   imgIndex--;
//   if (imgIndex < 1) {
//     imgIndex = resortFigures.length;
//   }
//   let imgSrc = document
//     .querySelector(`[data-index="${imgIndex}"]`)
//     .querySelector(".rotate-slide")
//     .getAttribute("src");
//   fullImg.setAttribute("src", imgSrc);
// };

// closeFull.addEventListener("click", () => {
//   document.querySelector(".full").style.display = "none";
// });

// footer newsletter input

const newsletterInput = document.querySelector(".newsletter-email");
const newsletterLabel = document.querySelector(".newsletter-label");

newsletterInput.addEventListener("change", (event) => {
  console.log("radi!!!");
});
