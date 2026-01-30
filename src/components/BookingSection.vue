<script setup>
import { ref, computed } from 'vue'

const monthNames = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']
const weekDays = ['Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub', 'Ned']

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
  return `${dateObj.date}. ${monthNames[dateObj.month].slice(0, 3)}`
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

const submitForm = () => {
  if (!checkIn.value || !checkOut.value) {
    alert('Molimo izaberite datume dolaska i odlaska.')
    return
  }
  
  const message = `Zdravo! Želim da rezervišem apartman.
  
Dolazak: ${formatDate(checkIn.value)} ${checkIn.value.year}
Odlazak: ${formatDate(checkOut.value)} ${checkOut.value.year}
Broj noćenja: ${numberOfNights.value}
Broj gostiju: ${guests.value}
Ime: ${name.value}
Email: ${email.value}
Telefon: ${phone.value}`
  
  const whatsappUrl = `https://wa.me/381642848080?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}
</script>

<template>
  <section id="booking" class="py-24 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-[var(--color-gold)] font-semibold text-sm uppercase tracking-wider">
          Rezervacija
        </span>
        <h2 class="section-title text-white mt-3 mb-6">
          Rezervišite svoj termin
        </h2>
        <p class="text-white/70 text-lg">
          Izaberite datume i pošaljite upit. Odgovorićemo vam u najkraćem roku.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Calendar -->
        <div class="lg:col-span-2 bg-white rounded-3xl p-8 shadow-2xl">
          <!-- Selected Dates Display -->
          <div class="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100">
            <div class="flex-1 min-w-[200px]">
              <label class="text-sm text-gray-500 mb-2 block">Dolazak</label>
              <div class="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-light)]">
                <i class="fa-regular fa-calendar text-[var(--color-accent)]"></i>
                <span class="font-semibold text-[var(--color-primary)]">
                  {{ checkIn ? formatDate(checkIn) : 'Izaberite datum' }}
                </span>
              </div>
            </div>
            <div class="flex-1 min-w-[200px]">
              <label class="text-sm text-gray-500 mb-2 block">Odlazak</label>
              <div class="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-light)]">
                <i class="fa-regular fa-calendar text-[var(--color-accent)]"></i>
                <span class="font-semibold text-[var(--color-primary)]">
                  {{ checkOut ? formatDate(checkOut) : 'Izaberite datum' }}
                </span>
              </div>
            </div>
            <div v-if="numberOfNights > 0" class="flex items-end">
              <div class="px-6 py-4 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold">
                {{ numberOfNights }} {{ numberOfNights === 1 ? 'noć' : 'noći' }}
              </div>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Current Month -->
            <div>
              <div class="flex items-center justify-between mb-6">
                <button 
                  v-if="canGoPrevMonth"
                  @click="prevMonthClick"
                  class="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <i class="fa-solid fa-chevron-left text-gray-400"></i>
                </button>
                <div v-else class="w-10"></div>
                <h3 class="font-semibold text-[var(--color-primary)]">
                  {{ monthNames[currentMonth] }} {{ currentYear }}
                </h3>
                <div class="w-10"></div>
              </div>
              
              <table class="w-full">
                <thead>
                  <tr>
                    <th v-for="day in weekDays" :key="day" class="text-xs text-gray-400 font-medium pb-4">
                      {{ day }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rowIndex) in currentMonthRows" :key="'curr-' + rowIndex">
                    <td 
                      v-for="(dateObj, cellIndex) in row" 
                      :key="'curr-' + rowIndex + '-' + cellIndex"
                      class="text-center p-1"
                    >
                      <button
                        v-if="dateObj.date"
                        @click="selectDate(dateObj)"
                        :disabled="dateObj.disabled"
                        class="w-10 h-10 rounded-full text-sm font-medium transition-all"
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
            <div>
              <div class="flex items-center justify-between mb-6">
                <div class="w-10"></div>
                <h3 class="font-semibold text-[var(--color-primary)]">
                  {{ monthNames[nextMonth] }} {{ nextYear }}
                </h3>
                <button 
                  @click="nextMonthClick"
                  class="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <i class="fa-solid fa-chevron-right text-gray-400"></i>
                </button>
              </div>
              
              <table class="w-full">
                <thead>
                  <tr>
                    <th v-for="day in weekDays" :key="day" class="text-xs text-gray-400 font-medium pb-4">
                      {{ day }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rowIndex) in nextMonthRows" :key="'next-' + rowIndex">
                    <td 
                      v-for="(dateObj, cellIndex) in row" 
                      :key="'next-' + rowIndex + '-' + cellIndex"
                      class="text-center p-1"
                    >
                      <button
                        v-if="dateObj.date"
                        @click="selectDate(dateObj)"
                        :disabled="dateObj.disabled"
                        class="w-10 h-10 rounded-full text-sm font-medium transition-all"
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

        <!-- Booking Form -->
        <div class="bg-white rounded-3xl p-8 shadow-2xl h-fit">
          <h3 class="text-xl font-semibold text-[var(--color-primary)] mb-6">
            Podaci za rezervaciju
          </h3>
          
          <form @submit.prevent="submitForm" class="space-y-5">
            <div>
              <label class="text-sm text-gray-500 mb-2 block">Broj gostiju</label>
              <div class="flex items-center gap-4 p-3 rounded-xl border border-gray-200">
                <button 
                  type="button"
                  @click="guests = Math.max(1, guests - 1)"
                  class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <i class="fa-solid fa-minus text-gray-600"></i>
                </button>
                <span class="flex-1 text-center font-semibold text-[var(--color-primary)]">
                  {{ guests }} {{ guests === 1 ? 'gost' : 'gostiju' }}
                </span>
                <button 
                  type="button"
                  @click="guests = Math.min(6, guests + 1)"
                  class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <i class="fa-solid fa-plus text-gray-600"></i>
                </button>
              </div>
            </div>

            <div>
              <label class="text-sm text-gray-500 mb-2 block">Ime i prezime</label>
              <input 
                v-model="name"
                type="text" 
                placeholder="Vaše ime"
                class="w-full p-4 rounded-xl border border-gray-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label class="text-sm text-gray-500 mb-2 block">Email</label>
              <input 
                v-model="email"
                type="email" 
                placeholder="vas@email.com"
                class="w-full p-4 rounded-xl border border-gray-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label class="text-sm text-gray-500 mb-2 block">Telefon</label>
              <input 
                v-model="phone"
                type="tel" 
                placeholder="+381 64 ..."
                class="w-full p-4 rounded-xl border border-gray-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 outline-none transition-all"
                required
              />
            </div>

            <button 
              type="submit"
              class="w-full btn-primary flex items-center justify-center gap-2"
            >
              <i class="fa-brands fa-whatsapp text-xl"></i>
              Pošalji upit
            </button>
            
            <p class="text-xs text-gray-400 text-center">
              Klikom na dugme šaljete upit putem WhatsApp-a
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
