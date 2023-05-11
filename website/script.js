// images

const images = {
  apartment: [
    ["./images/5.jpg", "./images/6.jpg", "./images/7.jpg", "./images/8.jpg"],
    ["./images/1.jpeg", "./images/2.jpeg", "./images/3.jpg", "./images/4.jpg"],
    ["./images/3.jpg", "./images/9.jpg", "./images/2.jpeg", "./images/1.jpeg"],
  ],
  resort: [
    ["./images/1.jpeg", "./images/2.jpeg", "./images/3.jpg", "./images/4.jpg"],
    ["./images/5.jpg", "./images/6.jpg", "./images/7.jpg", "./images/8.jpg"],
    ["./images/3.jpg", "./images/9.jpg", "./images/2.jpeg", "./images/1.jpeg"],
  ],
};

// about us tabs

const tabLinks = document.querySelectorAll(".tab-link");
const tabContents = document.querySelectorAll(".tab-content");
const mapSection = document.querySelector(".map");

let tabIndex = 0;

tabLinks.forEach((tabLink, index) => {
  tabLink.addEventListener("click", (e) => {
    let imgSlider = document.querySelector(".info-tabs .img-slider");
    tabIndex = index;
    if (tabIndex === tabLinks.length - 1) {
      imgSlider.style.display = "none";
      mapSection.style.display = "block";
    } else {
      imgSlider.style.display = "flex";
      mapSection.style.display = "none";
      imgSlider
        .querySelector("img")
        .setAttribute("src", images.resort[tabIndex][0]);
    }

    for (link of tabLinks) {
      link.classList.remove("active");
    }
    for (content of tabContents) {
      content.classList.remove("active");
    }

    e.target.classList.add("active");
    tabContents[tabIndex].classList.add("active");
  });
});

// slider

let imgNum = 0;

const nextSlide = (e) => {
  imgNum++;
  let arrIndex;
  let section = e.closest(".img-slider").getAttribute("data-imagesSection");
  if (section === "resort") {
    arrIndex = tabIndex;
  }
  if (section === "apartment") {
    arrIndex = e.closest(".service-images").getAttribute("data-serviceIndex");
  }

  if (imgNum > images[section][arrIndex].length - 1) {
    imgNum = 0;
  }
  e.closest(".img-slider")
    .querySelector(".slide-img")
    .setAttribute("src", images[section][arrIndex][imgNum]);
};

const prevSlide = (e) => {
  imgNum--;
  let section = e.closest(".img-slider").getAttribute("data-imagesSection");
  if (section === "resort") {
    arrIndex = tabIndex;
  }
  if (section === "apartment") {
    arrIndex = e.closest(".service-images").getAttribute("data-serviceIndex");
  }
  if (imgNum < 0) {
    imgNum = images[section][arrIndex].length - 1;
  }
  e.closest(".img-slider")
    .querySelector(".slide-img")
    .setAttribute("src", images[section][arrIndex][imgNum]);
};

// datepicker

const date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth() + 1;
let nextYear = currentYear;
let comingMonth = currentMonth + 1;

const getMonthName = (month) => {
  let monthName;
  switch (month) {
    case 1:
      monthName = "Jan";
      break;
    case 2:
      monthName = "Feb";
      break;
    case 3:
      monthName = "Mar";
      break;
    case 4:
      monthName = "Apr";
      break;
    case 5:
      monthName = "May";
      break;
    case 6:
      monthName = "Jun";
      break;
    case 7:
      monthName = "Jul";
      break;
    case 8:
      monthName = "Aug";
      break;
    case 9:
      monthName = "Sep";
      break;
    case 10:
      monthName = "Oct";
      break;
    case 11:
      monthName = "Nov";
      break;
    case 12:
      monthName = "Dec";
      break;
  }
  return monthName;
};

const currentMonthNameSpan = document.querySelector(".current-month-name");
const currentMonthYearSpan = document.querySelector(".current-month-year");
const nextMonthNameSpan = document.querySelector(".next-month-name");
const nextMonthYearSpan = document.querySelector(".next-month-year");

currentMonthNameSpan.innerHTML = getMonthName(currentMonth);
currentMonthYearSpan.innerHTML = currentYear;
nextMonthNameSpan.innerHTML = getMonthName(comingMonth);
nextMonthYearSpan.innerHTML = nextYear;

const prevMonth = () => {
  if (
    currentMonth === date.getMonth() + 2 &&
    currentYear === date.getFullYear()
  ) {
    document.querySelector(".current-month i").style.display = "none";
  }
  comingMonth = currentMonth;
  currentMonth = currentMonth - 1;
  if (comingMonth === 1) {
    currentMonth = 12;
    nextYear -= 1;
  }
  if (comingMonth === 12) {
    currentYear -= 1;
  }
  currentMonthNameSpan.innerHTML = getMonthName(currentMonth);
  currentMonthYearSpan.innerHTML = currentYear;
  nextMonthNameSpan.innerHTML = getMonthName(comingMonth);
  nextMonthYearSpan.innerHTML = nextYear;
};

const nextMonth = () => {
  document.querySelector(".current-month i").style.display = "block";
  currentMonth = comingMonth;
  comingMonth += 1;
  if (currentMonth === 12) {
    comingMonth = 1;
    nextYear += 1;
  }
  if (currentMonth === 1) {
    currentYear += 1;
  }

  currentMonthNameSpan.innerHTML = getMonthName(currentMonth);
  currentMonthYearSpan.innerHTML = currentYear;
  nextMonthNameSpan.innerHTML = getMonthName(comingMonth);
  nextMonthYearSpan.innerHTML = nextYear;
};
