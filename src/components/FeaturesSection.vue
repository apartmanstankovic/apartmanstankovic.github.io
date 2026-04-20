<script setup>
import { computed } from 'vue'
import { useI18n } from '../i18n/useI18n'

const { t } = useI18n()

const featureIcons = [
  'fa-solid fa-bed',
  'fa-solid fa-mountain-sun',
  'fa-solid fa-person-skiing',
  'fa-solid fa-wifi',
  'fa-solid fa-car',
  'fa-solid fa-spa'
]

const features = computed(() => 
  t.value.features.items.map((item, index) => ({
    ...item,
    icon: featureIcons[index]
  }))
)

const amenities = computed(() => t.value.features.amenities)
</script>

<template>
  <section id="features" class="py-16 sm:py-20 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <h3 class="section-subtitle">
          {{ t.features.subtitle }}
        </h3>
        <h2 class="section-title text-[var(--color-primary)] mb-6">
          {{ t.features.title }}
        </h2>
        <p class="text-gray-600 text-lg">
          {{ t.features.description }}
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-20">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="group p-6 sm:p-8 rounded-2xl bg-[var(--color-light)] card-hover cursor-default"
        >
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[#ff6b6b] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <i :class="feature.icon" class="text-white text-xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-[var(--color-primary)] mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>

      <!-- Amenities Banner -->
      <div class="relative rounded-2xl sm:rounded-3xl overflow-hidden">
        <div class="absolute inset-0">
          <img 
            src="/images/4.jpg" 
            alt="Apartman enterijer" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-[var(--color-primary)]/90"></div>
        </div>
        
        <div class="relative p-6 sm:p-10 md:p-16">
          <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div class="text-center md:text-left">
              <h3 class="text-2xl sm:text-3xl font-[var(--font-display)] font-semibold text-white mb-4">
                {{ t.features.bannerTitle }}
              </h3>
              <p class="text-white/70 text-base sm:text-lg mb-6 sm:mb-8">
                {{ t.features.bannerDescription }}
              </p>
              <a href="#booking" class="btn-primary">
                {{ t.features.bannerButton }}
              </a>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 md:mt-0">
              <div 
                v-for="(amenity, index) in amenities" 
                :key="index"
                class="flex items-center gap-3 text-white/90 text-sm sm:text-base"
              >
                <i class="fa-solid fa-check text-[var(--color-gold)] flex-shrink-0"></i>
                <span>{{ amenity }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
