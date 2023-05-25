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

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getMonthName = (month) => {
  return monthNames[month];
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
  return (day - 1) % 7;
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

const calendarDates = document.querySelectorAll(".calendar-date");
const SELECTED_DATE_CLASS = "selected-date";
const DATA_DATE_ATTRIBUTE = "data-date";

let checkIn = null;
let checkInDate = null;
let checkInMonth = null;
let checkOut = null;
let checkOutDate = null;
let checkOutMonth = null;

const getDateDateAttribute = (element) => {
  return element.getAttribute(DATA_DATE_ATTRIBUTE);
};

const removeSelectedRange = () => {
  calendarDates.forEach((el) => {
    el.classList.remove("range");
  });
};

const rangeSelector = () => {
  let checkedInIndex;
  allDates.forEach((el, index) => {
    el.addEventListener("click", (e) => {
      if(el.classList.contains("disabled-date")) {
        e.preventDefault()
      } else {
        if (checkIn && checkOut) {
          removeSelectedRange();
          checkIn.classList.remove(SELECTED_DATE_CLASS);
          checkOut.classList.remove(SELECTED_DATE_CLASS);
          checkIn = el;
          checkInDate = +checkIn.innerHTML;
          checkInMonth = getDateDateAttribute(checkIn);
          checkIn.classList.add(SELECTED_DATE_CLASS);
          checkIn.setAttribute("check-in", true);
          checkOut = null;
          monthsFarFromCheckedIn = null;
          monthsFarFromCheckedOut = null;
        } else if (checkIn) {
          if (
            (+el.innerHTML < checkInDate &&
              getDateDateAttribute(el) === getDateDateAttribute(checkIn)) ||
            (getDateDateAttribute(checkIn) === "next-month-date" &&
              getDateDateAttribute(el) === "current-month-date")
          ) {
            removeSelectedRange();
            checkIn.classList.remove(SELECTED_DATE_CLASS);
            checkIn = el;
            checkInDate = +checkIn.innerHTML;
            checkInMonth = getDateDateAttribute(checkIn);
            checkIn.classList.add(SELECTED_DATE_CLASS);
            checkIn.setAttribute("check-in", true);
            monthsFarFromCheckedIn = null;
          } else {
            checkOut = el;
            checkOutDate = +checkOut.innerHTML;
            checkOutMonth = getDateDateAttribute(checkOut);
            checkOut.classList.add(SELECTED_DATE_CLASS);
            checkOut.setAttribute("check-out", true);
            monthsFarFromCheckedOut = null;
          }
        } else if (!checkIn) {
          removeSelectedRange();
          checkIn = el;
          checkInDate = +checkIn.innerHTML;
          checkInMonth = getDateDateAttribute(checkIn);
          checkIn.classList.add(SELECTED_DATE_CLASS);
          checkIn.setAttribute("check-in", true);
          monthsFarFromCheckedIn = null;
        }
        checkedInIndex = index;
      }

    });

    let outedIndex;
    el.addEventListener("mouseenter", () => {
      for (let i = checkedInIndex + 1; i < index + 1; i++) {
        outedIndex = index;
        if (!checkOut) {
          allDates[i].classList.add("range");
        }
      }
    });
    el.addEventListener("mouseout", () => {
      for (let i = checkedInIndex + 1; i < outedIndex + 1; i++) {
        if (!checkOut) {
          allDates[i].classList.remove("range");
        }
      }
    });
  });
};

rangeSelector();

let monthsFarFromCheckedIn = null;
let monthsFarFromCheckedOut = null;

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

  if (checkIn) {
    checkIn.classList.remove("selected-date");
    if (checkInMonth === "current-month-date") {
      monthsFarFromCheckedIn = 0;
      nextMonthDates.forEach((el) => {
        if (+el.innerHTML === checkInDate) {
          checkIn = el;
          checkIn.classList.add("selected-date");
          checkInMonth = checkIn.getAttribute("data-date");
        }
      });
    } else if (checkInMonth === "next-month-date") {
      monthsFarFromCheckedIn = 1;
      checkInMonth = null;
    }
    monthsFarFromCheckedIn++;
    if (monthsFarFromCheckedIn === 0) {
      currentMonthDates.forEach((el) => {
        if (+el.innerHTML === checkInDate) {
          checkIn = el;
          checkIn.classList.add("selected-date");
          checkInMonth = checkIn.getAttribute("data-date");
        }
      });
    }
  }

  if (checkOut) {
    checkOut.classList.remove("selected-date");
    if (checkOutMonth === "current-month-date") {
      monthsFarFromCheckedOut = 0;
      nextMonthDates.forEach((el) => {
        if (+el.innerHTML === checkOutDate) {
          checkOut = el;
          checkOut.classList.add("selected-date");
          checkOutMonth = checkOut.getAttribute("data-date");
        }
      });
    } else if (checkOutMonth === "next-month-date") {
      monthsFarFromCheckedOut = 1;
      checkOutMonth = null;
    }
    monthsFarFromCheckedOut++;
    if (monthsFarFromCheckedOut === 0) {
      currentMonthDates.forEach((el) => {
        if (+el.innerHTML === checkOutDate) {
          checkOut = el;
          checkOut.classList.add("selected-date");
          checkOutMonth = checkOut.getAttribute("data-date");
        }
      });
    }
  }
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

  if (checkIn) {
    checkIn.classList.remove("selected-date");
    if (checkInMonth === "next-month-date") {
      monthsFarFromCheckedIn = 1;
      currentMonthDates.forEach((el) => {
        if (+el.innerHTML === checkInDate) {
          checkIn = el;
          checkIn.classList.add("selected-date");
          checkInMonth = checkIn.getAttribute("data-date");
        }
      });
    } else if (checkInMonth === "current-month-date") {
      monthsFarFromCheckedIn = 0;
      checkInMonth = null;
    }
    monthsFarFromCheckedIn--;
    if (monthsFarFromCheckedIn === 1) {
      nextMonthDates.forEach((el) => {
        if (+el.innerHTML === checkInDate) {
          checkIn = el;
          checkIn.classList.add("selected-date");
          checkInMonth = checkIn.getAttribute("data-date");
        }
      });
    }
  }

  if (checkOut) {
    checkOut.classList.remove("selected-date");
    if (checkOutMonth === "next-month-date") {
      monthsFarFromCheckedOut = 1;
      currentMonthDates.forEach((el) => {
        if (+el.innerHTML === checkOutDate) {
          checkOut = el;
          checkOut.classList.add("selected-date");
          checkOutMonth = checkOut.getAttribute("data-date");
        }
      });
    } else if (checkOutMonth === "current-month-date") {
      monthsFarFromCheckedOut = 0;
      checkOutMonth = null;
    }
    monthsFarFromCheckedOut--;
    if (monthsFarFromCheckedOut === 1) {
      nextMonthDates.forEach((el) => {
        if (+el.innerHTML === checkOutDate) {
          checkOut = el;
          checkOut.classList.add("selected-date");
          checkOutMonth = checkOut.getAttribute("data-date");
        }
      });
    }
  }
};
