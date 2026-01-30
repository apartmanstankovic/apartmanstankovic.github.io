<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../i18n/useI18n'

const { t } = useI18n()

const monthNames = computed(() => t.value.booking.monthNames)
const weekDays = computed(() => t.value.booking.weekDays)

const today = new Date()
const todayDate = today.getDate()
const todayMonth = today.getMonth()
const todayYear = today.getFullYear()

const currentMonth = ref(todayMonth)
const currentYear = ref(todayYear)
const checkIn = ref(null)
const checkOut = ref(null)
const guests = ref(2)
const name = ref('')
const email = ref('')
const phone = ref('')

const nextMonth = computed(() => {
  if (currentMonth.value === 11) return 0
  return currentMonth.value + 1
})

const nextYear = computed(() => {
  if (currentMonth.value === 11) return currentYear.value + 1
  return currentYear.value
})

const getLastDateInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayInMonth = (month, year) => {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 7 : day
}

const generateMonthDates = (month, year) => {
  const dates = []
  const daysInMonth = getLastDateInMonth(month, year)
  const firstDay = getFirstDayInMonth(month, year)
  
  for (let i = 1; i < firstDay; i++) {
    dates.push({ date: null, disabled: true })
  }
  
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

const currentMonthDates = computed(() => generateMonthDates(currentMonth.value, currentYear.value))
const nextMonthDates = computed(() => generateMonthDates(nextMonth.value, nextYear.value))

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

const formatDate = (dateObj) => {
  if (!dateObj) return ''
  return `${dateObj.date}. ${monthNames.value[dateObj.month].slice(0, 3)}`
}

const numberOfNights = computed(() => {
  if (!checkIn.value || !checkOut.value) return 0
  const checkInTime = new Date(checkIn.value.year, checkIn.value.month, checkIn.value.date).getTime()
  const checkOutTime = new Date(checkOut.value.year, checkOut.value.month, checkOut.value.date).getTime()
  return Math.ceil((checkOutTime - checkInTime) / (1000 * 60 * 60 * 24))
})

const chunkArray = (arr, size) => {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
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

const guestsLabel = computed(() => {
  return guests.value === 1 ? t.value.booking.guest : t.value.booking.guestsPlural
})

const submitForm = () => {
  if (!checkIn.value || !checkOut.value) {
    alert(t.value.booking.alertSelectDates)
    return
  }
  
  const message = `${t.value.booking.whatsappMessage}
  
${t.value.booking.checkIn}: ${formatDate(checkIn.value)} ${checkIn.value.year}
${t.value.booking.checkOut}: ${formatDate(checkOut.value)} ${checkOut.value.year}
${t.value.booking.nights}: ${numberOfNights.value}
${t.value.booking.guests}: ${guests.value}
${t.value.booking.name}: ${name.value}
${t.value.booking.email}: ${email.value}
${t.value.booking.phone}: ${phone.value}`
  
  const whatsappUrl = `https://wa.me/381642848080?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}
</script>

<template>
  <section id="booking" class="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <h3 class="section-subtitle !text-[var(--color-gold)]">
          {{ t.booking.subtitle }}
        </h3>
        <h2 class="section-title text-white mb-6">
          {{ t.booking.title }}
        </h2>
        <p class="text-white/70 text-lg">
          {{ t.booking.description }}
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <!-- Calendar Card -->
        <div class="flex-1 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl">
          <!-- Selected Dates Display -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-100">
            <div>
              <label class="text-xs sm:text-sm text-gray-500 mb-2 block">{{ t.booking.checkIn }}</label>
              <div class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-[var(--color-light)]">
                <i class="fa-regular fa-calendar text-[var(--color-accent)] text-sm sm:text-base"></i>
                <span class="font-semibold text-[var(--color-primary)] text-sm sm:text-base truncate">
                  {{ checkIn ? formatDate(checkIn) : t.booking.select }}
                </span>
              </div>
            </div>
            <div>
              <label class="text-xs sm:text-sm text-gray-500 mb-2 block">{{ t.booking.checkOut }}</label>
              <div class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-[var(--color-light)]">
                <i class="fa-regular fa-calendar text-[var(--color-accent)] text-sm sm:text-base"></i>
                <span class="font-semibold text-[var(--color-primary)] text-sm sm:text-base truncate">
                  {{ checkOut ? formatDate(checkOut) : t.booking.select }}
                </span>
              </div>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label class="text-xs sm:text-sm text-gray-500 mb-2 block">{{ t.booking.nights }}</label>
              <div class="flex items-center justify-center gap-2 p-3 sm:p-4 rounded-xl bg-[var(--color-accent)]/10">
                <span class="font-semibold text-[var(--color-accent)] text-sm sm:text-base">
                  {{ numberOfNights > 0 ? numberOfNights : '-' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <!-- Current Month -->
            <div class="flex flex-col items-center">
              <div class="flex items-center justify-between w-full max-w-[280px] mb-4">
                <button 
                  @click="prevMonthClick"
                  :disabled="!canGoPrevMonth"
                  class="w-9 h-9 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <i class="fa-solid fa-chevron-left text-gray-400"></i>
                </button>
                <h3 class="font-semibold text-[var(--color-primary)] text-sm sm:text-base">
                  {{ monthNames[currentMonth] }} {{ currentYear }}
                </h3>
                <button 
                  @click="nextMonthClick"
                  class="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors md:invisible"
                >
                  <i class="fa-solid fa-chevron-right text-gray-400"></i>
                </button>
              </div>
              
              <table class="w-full max-w-[280px]">
                <thead>
                  <tr>
                    <th v-for="day in weekDays" :key="day" class="text-xs text-gray-400 font-medium pb-3 w-10">
                      {{ day }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rowIndex) in currentMonthRows" :key="'curr-' + rowIndex">
                    <td 
                      v-for="(dateObj, cellIndex) in row" 
                      :key="'curr-' + rowIndex + '-' + cellIndex"
                      class="text-center p-0.5"
                    >
                      <button
                        v-if="dateObj.date"
                        @click="selectDate(dateObj)"
                        :disabled="dateObj.disabled"
                        class="w-9 h-9 rounded-full text-sm font-medium transition-all"
                        :class="{
                          'text-gray-300 cursor-not-allowed': dateObj.disabled,
                          'hover:bg-gray-100 text-[var(--color-primary)]': !dateObj.disabled && !isSelected(dateObj) && !isInRange(dateObj),
                          'bg-[var(--color-accent)] text-white': isSelected(dateObj),
                          'bg-[var(--color-accent)]/10 text-[var(--color-accent)]': isInRange(dateObj)
                        }"
                      >
                        {{ dateObj.date }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Next Month -->
            <div class="hidden md:flex flex-col items-center">
              <div class="flex items-center justify-between w-full max-w-[280px] mb-4">
                <div class="w-9"></div>
                <h3 class="font-semibold text-[var(--color-primary)] text-sm sm:text-base">
                  {{ monthNames[nextMonth] }} {{ nextYear }}
                </h3>
                <button 
                  @click="nextMonthClick"
                  class="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <i class="fa-solid fa-chevron-right text-gray-400"></i>
                </button>
              </div>
              
              <table class="w-full max-w-[280px]">
                <thead>
                  <tr>
                    <th v-for="day in weekDays" :key="day" class="text-xs text-gray-400 font-medium pb-3 w-10">
                      {{ day }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rowIndex) in nextMonthRows" :key="'next-' + rowIndex">
                    <td 
                      v-for="(dateObj, cellIndex) in row" 
                      :key="'next-' + rowIndex + '-' + cellIndex"
                      class="text-center p-0.5"
                    >
                      <button
                        v-if="dateObj.date"
                        @click="selectDate(dateObj)"
                        :disabled="dateObj.disabled"
                        class="w-9 h-9 rounded-full text-sm font-medium transition-all"
                        :class="{
                          'text-gray-300 cursor-not-allowed': dateObj.disabled,
                          'hover:bg-gray-100 text-[var(--color-primary)]': !dateObj.disabled && !isSelected(dateObj) && !isInRange(dateObj),
                          'bg-[var(--color-accent)] text-white': isSelected(dateObj),
                          'bg-[var(--color-accent)]/10 text-[var(--color-accent)]': isInRange(dateObj)
                        }"
                      >
                        {{ dateObj.date }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Booking Form Card -->
        <div class="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl h-fit">
          <h3 class="text-lg sm:text-xl font-semibold text-[var(--color-primary)] mb-5 sm:mb-6">
            {{ t.booking.formTitle }}
          </h3>
          
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="text-sm text-gray-500 mb-2 block">{{ t.booking.guests }}</label>
              <div class="flex items-center gap-3 p-3 rounded-xl border border-gray-200">
                <button 
                  type="button"
                  @click="guests = Math.max(1, guests - 1)"
                  class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center flex-shrink-0"
                >
                  <i class="fa-solid fa-minus text-gray-600 text-sm"></i>
                </button>
                <span class="flex-1 text-center font-semibold text-[var(--color-primary)]">
                  {{ guests }} {{ guestsLabel }}
                </span>
                <button 
                  type="button"
                  @click="guests = Math.min(6, guests + 1)"
                  class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center flex-shrink-0"
                >
                  <i class="fa-solid fa-plus text-gray-600 text-sm"></i>
                </button>
              </div>
            </div>

            <div>
              <label class="text-sm text-gray-500 mb-2 block">{{ t.booking.name }}</label>
              <input 
                v-model="name"
                type="text" 
                :placeholder="t.booking.namePlaceholder"
                class="w-full p-3.5 rounded-xl border border-gray-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 outline-none transition-all text-sm"
                required
              />
            </div>

            <div>
              <label class="text-sm text-gray-500 mb-2 block">{{ t.booking.email }}</label>
              <input 
                v-model="email"
                type="email" 
                placeholder="vas@email.com"
                class="w-full p-3.5 rounded-xl border border-gray-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 outline-none transition-all text-sm"
                required
              />
            </div>

            <div>
              <label class="text-sm text-gray-500 mb-2 block">{{ t.booking.phone }}</label>
              <input 
                v-model="phone"
                type="tel" 
                placeholder="+381 64 ..."
                class="w-full p-3.5 rounded-xl border border-gray-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 outline-none transition-all text-sm"
                required
              />
            </div>

            <button 
              type="submit"
              class="w-full btn-primary flex items-center justify-center gap-2 mt-6"
            >
              <i class="fa-brands fa-whatsapp text-xl"></i>
              {{ t.booking.submit }}
            </button>
            
            <p class="text-xs text-gray-400 text-center pt-1">
              {{ t.booking.whatsappNote }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
