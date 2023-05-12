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
    const imgSlider = document.querySelector(".info-tabs .img-slider");
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
let currentMonth = date.getMonth();
let nextYear = currentYear;
let comingMonth = currentMonth + 1;

const getMonthName = (month) => {
  let monthName;
  switch (month) {
    case 0:
      monthName = "Jan";
      break;
    case 1:
      monthName = "Feb";
      break;
    case 2:
      monthName = "Mar";
      break;
    case 3:
      monthName = "Apr";
      break;
    case 4:
      monthName = "May";
      break;
    case 5:
      monthName = "Jun";
      break;
    case 6:
      monthName = "Jul";
      break;
    case 7:
      monthName = "Aug";
      break;
    case 8:
      monthName = "Sep";
      break;
    case 9:
      monthName = "Oct";
      break;
    case 10:
      monthName = "Nov";
      break;
    case 11:
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

const getLastDateInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const getFirstDayInMonth = (month, year) => {
  return new Date(year, month, 0).getDay() + 1;
};

let daysInCurrentMonth = getLastDateInMonth(currentMonth - 1, currentYear);
let firstDayInCurrentMonth = getFirstDayInMonth(currentMonth, currentYear);
let daysInNextMonth = getLastDateInMonth(currentMonth, currentYear);
let firstDayInNextMonth = getFirstDayInMonth(currentMonth + 1, currentYear);

const currentMonthDays = document.querySelectorAll(
  '[data-day="current-month-day"]'
);
const nextMonthDays = document.querySelectorAll('[data-day="next-month-day"]');
const currentMonthDates = document.querySelectorAll(
  '[data-date="current-month-date"]'
);
const nextMonthDates = document.querySelectorAll(
  '[data-date="next-month-date"]'
);

const orderDaysOfWeek = (day) => {
  switch (day) {
    case 1:
      day = 0;
      break;
    case 2:
      day = 1;
      break;
    case 3:
      day = 2;
      break;
    case 4:
      day = 3;
      break;
    case 5:
      day = 4;
      break;
    case 6:
      day = 5;
      break;
    case 7:
      day = 6;
      break;
  }
  return day;
};

const clearElementsValue = (elements) => {
  elements.forEach((el) => {
    el.innerHTML = "";
    el.classList.remove("calendar-date");
  });
};

const renderDatesInCurrentMonth = () => {
  let currentMonthDate = 1;
  const orderedFirstDayInCurrentMonth = orderDaysOfWeek(firstDayInCurrentMonth);

  for (
    let i = orderedFirstDayInCurrentMonth;
    i < daysInCurrentMonth + orderedFirstDayInCurrentMonth;
    i++
  ) {
    currentMonthDates[i].classList.add("calendar-date");
    currentMonthDates[i].innerHTML = currentMonthDate;
    currentMonthDate += 1;
  }
};

const renderDatesInNextMonth = () => {
  let nextMonthDate = 1;
  const orderedFirstDayInNextMonth = orderDaysOfWeek(firstDayInNextMonth);

  for (
    let i = orderedFirstDayInNextMonth;
    i < daysInNextMonth + orderedFirstDayInNextMonth;
    i++
  ) {
    nextMonthDates[i].classList.add("calendar-date");
    nextMonthDates[i].innerHTML = nextMonthDate;
    nextMonthDate += 1;
  }
};

const prevMonth = () => {
  if (
    currentMonth === date.getMonth() + 1 &&
    currentYear === date.getFullYear()
  ) {
    document.querySelector(".current-month i").style.display = "none";
  }
  comingMonth = currentMonth;
  currentMonth = currentMonth - 1;

  if (comingMonth === 0) {
    currentMonth = 11;
    currentYear -= 1;
  }

  if (comingMonth === 11) {
    nextYear -= 1;
  }

  currentMonthNameSpan.innerHTML = getMonthName(currentMonth);
  currentMonthYearSpan.innerHTML = currentYear;
  nextMonthNameSpan.innerHTML = getMonthName(comingMonth);
  nextMonthYearSpan.innerHTML = nextYear;

  daysInCurrentMonth = getLastDateInMonth(currentMonth + 1, currentYear);
  firstDayInCurrentMonth = getFirstDayInMonth(currentMonth, currentYear);
  daysInNextMonth = getLastDateInMonth(comingMonth + 1, currentYear);
  firstDayInNextMonth = getFirstDayInMonth(currentMonth + 1, currentYear);

  clearElementsValue(currentMonthDates);
  clearElementsValue(nextMonthDates);

  renderDatesInCurrentMonth();
  renderDatesInNextMonth();
};

const nextMonth = () => {
  document.querySelector(".current-month i").style.display = "block";
  currentMonth = comingMonth;
  comingMonth += 1;

  if (currentMonth === 11) {
    comingMonth = 0;
    nextYear += 1;
  }

  if (currentMonth === 0) {
    currentYear += 1;
  }

  currentMonthNameSpan.innerHTML = getMonthName(currentMonth);
  currentMonthYearSpan.innerHTML = currentYear;
  nextMonthNameSpan.innerHTML = getMonthName(comingMonth);
  nextMonthYearSpan.innerHTML = nextYear;

  daysInCurrentMonth = getLastDateInMonth(currentMonth + 1, currentYear);
  firstDayInCurrentMonth = getFirstDayInMonth(currentMonth, currentYear);
  daysInNextMonth = getLastDateInMonth(comingMonth + 1, currentYear);
  firstDayInNextMonth = getFirstDayInMonth(currentMonth + 1, currentYear);

  clearElementsValue(currentMonthDates);
  clearElementsValue(nextMonthDates);

  renderDatesInCurrentMonth();
  renderDatesInNextMonth();
};

renderDatesInCurrentMonth();
renderDatesInNextMonth();
