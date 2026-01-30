<script setup>
import { ref, computed, onMounted } from 'vue'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const today = new Date()
const todayDate = today.getDate()
const todayMonth = today.getMonth()
const todayYear = today.getFullYear()

const currentMonth = ref(todayMonth)
const currentYear = ref(todayYear)

const nextMonth = computed(() => {
  if (currentMonth.value === 11) return 0
  return currentMonth.value + 1
})

const nextYear = computed(() => {
  if (currentMonth.value === 11) return currentYear.value + 1
  return currentYear.value
})

const checkIn = ref(null)
const checkOut = ref(null)

const getMonthName = (month) => monthNames[month]

const getLastDateInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayInMonth = (month, year) => {
  const day = new Date(year, month, 1).getDay()
  // Convert Sunday (0) to 7 for Monday-first calendar
  return day === 0 ? 7 : day
}

const generateMonthDates = (month, year) => {
  const dates = []
  const daysInMonth = getLastDateInMonth(month, year)
  const firstDay = getFirstDayInMonth(month, year)
  
  // Add empty cells for days before the first of the month
  for (let i = 1; i < firstDay; i++) {
    dates.push({ date: null, disabled: true })
  }
  
  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const isDisabled = 
      year < todayYear || 
      (year === todayYear && month < todayMonth) ||
      (year === todayYear && month === todayMonth && i < todayDate)
    
    dates.push({
      date: i,
      month,
      year,
      disabled: isDisabled,
      key: `${year}-${month}-${i}`
    })
  }
  
  return dates
}

const currentMonthDates = computed(() => 
  generateMonthDates(currentMonth.value, currentYear.value)
)

const nextMonthDates = computed(() => 
  generateMonthDates(nextMonth.value, nextYear.value)
)

const canGoPrevMonth = computed(() => {
  return currentMonth.value > todayMonth || currentYear.value > todayYear
})

const prevMonthClick = () => {
  if (!canGoPrevMonth.value) return
  
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonthClick = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const isSelected = (dateObj) => {
  if (!dateObj.date) return false
  
  const checkInMatch = checkIn.value && 
    checkIn.value.date === dateObj.date && 
    checkIn.value.month === dateObj.month && 
    checkIn.value.year === dateObj.year
    
  const checkOutMatch = checkOut.value && 
    checkOut.value.date === dateObj.date && 
    checkOut.value.month === dateObj.month && 
    checkOut.value.year === dateObj.year
    
  return checkInMatch || checkOutMatch
}

const isInRange = (dateObj) => {
  if (!checkIn.value || !checkOut.value || !dateObj.date) return false
  
  const dateValue = new Date(dateObj.year, dateObj.month, dateObj.date).getTime()
  const checkInValue = new Date(checkIn.value.year, checkIn.value.month, checkIn.value.date).getTime()
  const checkOutValue = new Date(checkOut.value.year, checkOut.value.month, checkOut.value.date).getTime()
  
  return dateValue > checkInValue && dateValue < checkOutValue
}

const selectDate = (dateObj) => {
  if (dateObj.disabled || !dateObj.date) return
  
  const selectedDate = { ...dateObj }
  
  if (!checkIn.value) {
    checkIn.value = selectedDate
  } else if (!checkOut.value) {
    const checkInTime = new Date(checkIn.value.year, checkIn.value.month, checkIn.value.date).getTime()
    const selectedTime = new Date(selectedDate.year, selectedDate.month, selectedDate.date).getTime()
    
    if (selectedTime > checkInTime) {
      checkOut.value = selectedDate
    } else {
      checkIn.value = selectedDate
    }
  } else {
    checkIn.value = selectedDate
    checkOut.value = null
  }
}

const stayTimeDisplay = computed(() => {
  if (checkIn.value && checkOut.value) {
    return `${checkIn.value.date} ${getMonthName(checkIn.value.month)} - ${checkOut.value.date} ${getMonthName(checkOut.value.month)}`
  } else if (checkIn.value) {
    return `Check-in: ${checkIn.value.date} ${getMonthName(checkIn.value.month)}`
  }
  return 'Select dates'
})

// Create rows of 7 for the calendar grid
const chunkArray = (arr, size) => {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  // Pad last row if needed
  if (chunks.length > 0) {
    const lastRow = chunks[chunks.length - 1]
    while (lastRow.length < size) {
      lastRow.push({ date: null, disabled: true })
    }
  }
  return chunks
}

const currentMonthRows = computed(() => chunkArray([...currentMonthDates.value], 7))
const nextMonthRows = computed(() => chunkArray([...nextMonthDates.value], 7))
</script>

<template>
  <form class="reserve-form">
    <div class="stay-time">{{ stayTimeDisplay }}</div>
    <div class="datepicker">
      <!-- Current Month -->
      <div class="current-month">
        <div class="calendar-month">
          <i 
            v-if="canGoPrevMonth"
            class="fa-solid fa-chevron-left" 
            @click="prevMonthClick"
          ></i>
          <h4>
            <span class="current-month-name">{{ getMonthName(currentMonth) }}</span>
            <span class="current-month-year">{{ currentYear }}</span>
          </h4>
        </div>
        <table>
          <thead>
            <tr>
              <td v-for="day in weekDays" :key="day" class="calendar-day">{{ day }}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in currentMonthRows" :key="'current-' + rowIndex">
              <td 
                v-for="(dateObj, cellIndex) in row" 
                :key="'current-' + rowIndex + '-' + cellIndex"
                :class="{
                  'calendar-date': dateObj.date !== null,
                  'disabled-date': dateObj.disabled,
                  'selected-date': isSelected(dateObj),
                  'range': isInRange(dateObj)
                }"
                @click="selectDate(dateObj)"
              >
                {{ dateObj.date }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Next Month -->
      <div class="next-month">
        <div class="calendar-month">
          <h4>
            <span class="next-month-name">{{ getMonthName(nextMonth) }}</span>
            <span class="next-month-year">{{ nextYear }}</span>
          </h4>
          <i 
            class="fa-solid fa-chevron-right" 
            @click="nextMonthClick"
          ></i>
        </div>
        <table>
          <thead>
            <tr>
              <td v-for="day in weekDays" :key="day" class="calendar-day">{{ day }}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in nextMonthRows" :key="'next-' + rowIndex">
              <td 
                v-for="(dateObj, cellIndex) in row" 
                :key="'next-' + rowIndex + '-' + cellIndex"
                :class="{
                  'calendar-date': dateObj.date !== null,
                  'disabled-date': dateObj.disabled,
                  'selected-date': isSelected(dateObj),
                  'range': isInRange(dateObj)
                }"
                @click="selectDate(dateObj)"
              >
                {{ dateObj.date }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </form>
</template>

<style scoped>
.reserve-form {
  display: grid;
  justify-content: center;
  align-items: center;
}

.stay-time {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em auto;
  width: 40em;
  height: 3em;
  border: 1px solid black;
  border-radius: 0.5em;
}

.datepicker {
  width: 100%;
  min-height: 40vh;
  display: flex;
  gap: 3em;
  transition: 0.3s ease-in-out;
}

.calendar-month {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
}

.calendar-month i {
  position: absolute;
  cursor: pointer;
  transition: 0.3s;
}

.calendar-month i:hover {
  transform: scale(1.3);
}

.current-month i {
  left: 1em;
}

.next-month i {
  right: 1em;
}

table {
  border-collapse: separate;
  border-spacing: 0 0.2em;
}

thead {
  border: 1px solid black;
}

.calendar-day {
  padding: 0.8em;
  font-weight: 600;
}

.calendar-date {
  cursor: pointer;
  letter-spacing: 0.1em;
  padding: 0.8em;
}

.calendar-date.disabled-date {
  color: rgb(141, 141, 141);
  cursor: no-drop;
}

.calendar-date:hover:not(.disabled-date),
.calendar-date.range {
  background: #1a1a1a1f;
}

.calendar-date.selected-date {
  background: #006ce4;
  color: white;
}
</style>
