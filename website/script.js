// About Us

// about us slider

const apartmentImg = document.querySelector(".slide-img");
const apartmentImages = [
  ["./images/1.jpeg", "./images/2.jpeg", "./images/3.jpg", "./images/4.jpg"],
  ["./images/5.jpg", "./images/6.jpg", "./images/7.jpg", "./images/8.jpg"],
  ["./images/3.jpg", "./images/9.jpg", "./images/2.jpeg", "./images/1.jpeg"],
];

let imgNum = 0;

const next = () => {
  let parent = event.target.closest(".img-slider");
  let tabImages = +parent.getAttribute("data-tabIndex");
  imgNum++;
  if (imgNum > apartmentImages[tabImages].length - 1) {
    imgNum = 0;
  }
  apartmentImg.src = apartmentImages[tabImages][imgNum];
};

const prev = () => {
  let parent = event.target.closest(".img-slider");
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
const imgSlider = document.querySelector(".img-slider");
const mapSection = document.querySelector(".map");

tabLinks.forEach((tabLink) => {
  tabLink.addEventListener("click", (e) => {
    let tab = e.target.getAttribute("data-tabLink");
    let tabIndex = tab - 1;
    imgSlider.setAttribute("data-tabIndex", tabIndex);
    if (tabIndex === tabLinks.length - 1) {
      imgSlider.style.display = "none";
      mapSection.style.display = "block";
    } else {
      imgSlider.style.display = "block";
      mapSection.style.display = "none";
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
    let tabContent = document.querySelector(`[data-tabContent="${tab}"]`);
    tabContent.classList.add("active");
  });
});
