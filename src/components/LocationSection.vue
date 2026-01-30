<script setup>
import { computed } from 'vue'
import { useI18n } from '../i18n/useI18n'

const { t } = useI18n()

const placeIcons = [
  'fa-solid fa-person-skiing',
  'fa-solid fa-utensils',
  'fa-solid fa-shop',
  'fa-solid fa-spa'
]

const nearbyPlaces = computed(() => 
  t.value.location.nearbyPlaces.map((place, index) => ({
    ...place,
    icon: placeIcons[index]
  }))
)
</script>

<template>
  <section id="location" class="py-16 sm:py-20 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <!-- Content -->
        <div>
          <span class="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider">
            {{ t.location.subtitle }}
          </span>
          <h2 class="section-title text-[var(--color-primary)] mt-3 mb-6">
            {{ t.location.title }}
          </h2>
          <p class="text-gray-600 text-lg mb-8 leading-relaxed">
            {{ t.location.description1 }}
          </p>
          <p class="text-gray-600 text-lg mb-10 leading-relaxed">
            {{ t.location.description2 }}
          </p>

          <!-- Nearby Places -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div 
              v-for="(place, index) in nearbyPlaces" 
              :key="index"
              class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[var(--color-light)]"
            >
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                <i :class="place.icon" class="text-white text-sm sm:text-base"></i>
              </div>
              <div>
                <div class="font-semibold text-[var(--color-primary)] text-sm sm:text-base">{{ place.name }}</div>
                <div class="text-xs sm:text-sm text-gray-500">{{ place.distance }}</div>
              </div>
            </div>
          </div>

          <!-- Address -->
          <div class="flex items-start gap-4 p-6 rounded-2xl border-2 border-[var(--color-light)]">
            <div class="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
              <i class="fa-solid fa-location-dot text-white"></i>
            </div>
            <div>
              <div class="font-semibold text-[var(--color-primary)] mb-1">{{ t.location.addressLabel }}</div>
              <div class="text-gray-600">
                Kopaonik Resort<br>
                36354 Kopaonik, Srbija
              </div>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="relative mt-8 lg:mt-0">
          <div class="hidden sm:block absolute -top-6 -left-6 w-24 h-24 bg-[var(--color-gold)]/20 rounded-full blur-2xl"></div>
          <div class="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full blur-2xl"></div>
          
          <div class="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23466.67680087491!2d20.798614849999998!3d43.2863889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4756f01c9dbfb9b5%3A0xb3c0b3e3b3b3b3b3!2sKopaonik!5e0!3m2!1sen!2srs!4v1700000000000!5m2!1sen!2srs"
              width="100%"
              height="350"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="rounded-2xl sm:rounded-3xl sm:h-[500px]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
