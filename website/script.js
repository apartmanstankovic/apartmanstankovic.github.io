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
const today = date.getDate();
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

const renderCurrentMonthAndYear = () => {
  document.querySelector(".current-month-name").innerHTML =
    getMonthName(currentMonth);
  document.querySelector(".current-month-year").innerHTML = currentYear;
};

const renderNextMonthAndYear = () => {
  document.querySelector(".next-month-name").innerHTML =
    getMonthName(comingMonth);
  document.querySelector(".next-month-year").innerHTML = nextYear;
};

const getLastDateInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const getFirstDayInMonth = (month, year) => {
  return new Date(year, month, 0).getDay() + 1;
};

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

const allDates = document.querySelectorAll("tbody > tr > td");
const currentMonthDates = document.querySelectorAll(
  '[data-date="current-month-date"]'
);
const nextMonthDates = document.querySelectorAll(
  '[data-date="next-month-date"]'
);

const renderDatesInMonth = (elements, currentMonth, currentYear) => {
  let dateInMonth = 1;
  let daysInMonth = getLastDateInMonth(currentMonth + 1, currentYear);
  let firstDayInMonth = getFirstDayInMonth(currentMonth, currentYear);
  const orderedFirstDayInMonth = orderDaysOfWeek(firstDayInMonth);

  for (
    let i = orderedFirstDayInMonth;
    i < daysInMonth + orderedFirstDayInMonth;
    i++
  ) {
    elements[i].classList.add("calendar-date");
    elements[i].setAttribute("checked", false);
    if (
      dateInMonth < today &&
      currentMonth === date.getMonth() &&
      currentYear === date.getFullYear()
    ) {
      elements[i].classList.add("disabled-date");
    } else {
      elements[i].classList.remove("disabled-date");
    }
    elements[i].innerHTML = dateInMonth;
    dateInMonth += 1;
  }
};

renderCurrentMonthAndYear();
renderNextMonthAndYear();

renderDatesInMonth(currentMonthDates, currentMonth, currentYear);
renderDatesInMonth(nextMonthDates, currentMonth + 1, currentYear);

let checkIn = null;
let checkInDate = null;
let checkOut = null;
let checkOutDate = null;

const rangeSelector = () => {
  allDates.forEach((el) => {
    el.addEventListener("click", () => {
      if (el.classList.contains("calendar-date")) {
        if (checkIn && checkOut) {
          checkIn.classList.remove("selected-date");
          checkOut.classList.remove("selected-date");
          checkOut = null;
          checkIn = el;
          checkInDate = +checkIn.innerHTML;
          checkIn.classList.add("selected-date");
        } else if (checkIn) {
          if (
            +el.innerHTML < checkInDate &&
            el.getAttribute("data-date") === checkIn.getAttribute("data-date")
          ) {
            checkIn.classList.remove("selected-date");
            checkIn = el;
            checkInDate = +checkIn.innerHTML;
            checkIn.classList.add("selected-date");
          } else if (
            checkIn.getAttribute("data-date") === "next-month-date" &&
            el.getAttribute("data-date") === "current-month-date"
          ) {
            checkIn.classList.remove("selected-date");
            checkIn = el;
            checkInDate = +checkIn.innerHTML;
            checkIn.classList.add("selected-date");
          } else {
            checkOut = el;
            checkOutDate = +checkOut.innerHTML;
            checkOut.classList.add("selected-date");
          }
        } else if (!checkIn && !el.classList.contains("disabled-date")) {
          checkIn = el;
          checkInDate = +checkIn.innerHTML;
          checkIn.classList.add("selected-date");
        }
      }
    });
  });
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

  renderCurrentMonthAndYear();
  renderNextMonthAndYear();

  clearElementsValue(currentMonthDates);
  clearElementsValue(nextMonthDates);

  renderDatesInMonth(currentMonthDates, currentMonth, currentYear);
  renderDatesInMonth(nextMonthDates, currentMonth + 1, currentYear);
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

  renderCurrentMonthAndYear();
  renderNextMonthAndYear();

  clearElementsValue(currentMonthDates);
  clearElementsValue(nextMonthDates);

  renderDatesInMonth(currentMonthDates, currentMonth, currentYear);
  renderDatesInMonth(nextMonthDates, currentMonth + 1, currentYear);
};

rangeSelector();
