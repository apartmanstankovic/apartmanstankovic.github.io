<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from '../i18n/useI18n'

const { t } = useI18n()

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<template>
  <section class="relative h-screen overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img 
        src="/images/2.jpeg" 
        alt="Kopaonik panorama" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
    </div>

    <!-- Decorative Elements (hidden on mobile to prevent overflow) -->
    <div class="hidden sm:block absolute top-20 left-10 w-72 h-72 bg-[var(--color-gold)]/10 rounded-full blur-3xl"></div>
    <div class="hidden sm:block absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl"></div>

    <!-- Content -->
    <div class="relative h-full flex items-center pt-16 sm:pt-20">
      <div class="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16 w-full">
        <div class="max-w-3xl">
          <!-- Badge -->
          <div 
            class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-4 sm:mb-6 md:mb-8 transition-all duration-700 shadow-lg"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span class="text-white text-xs sm:text-sm font-medium drop-shadow-md">{{ t.hero.badge }}</span>
          </div>

          <!-- Main Title -->
          <h1 
            class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[var(--font-display)] font-bold text-white leading-tight mb-3 sm:mb-4 md:mb-6 transition-all duration-700 delay-100"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            style="text-shadow: 2px 2px 8px rgba(0,0,0,0.5);"
          >
            {{ t.hero.title }}
            <span class="text-gradient block">{{ t.hero.titleHighlight }}</span>
          </h1>

          <!-- Subtitle -->
          <p 
            class="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-xl transition-all duration-700 delay-200 drop-shadow-md"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5);"
          >
            {{ t.hero.subtitle }}
          </p>

          <!-- CTA Buttons -->
          <div 
            class="flex flex-wrap gap-3 sm:gap-4 transition-all duration-700 delay-300"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <a href="#booking" class="btn-primary text-sm sm:text-base">
              <i class="fa-regular fa-calendar-check mr-2"></i>
              {{ t.hero.ctaBook }}
            </a>
            <a href="#gallery" class="btn-outline text-sm sm:text-base">
              <i class="fa-regular fa-images mr-2"></i>
              {{ t.hero.ctaGallery }}
            </a>
          </div>

          <!-- Stats -->
          <div 
            class="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 pt-4 sm:pt-6 md:pt-8 border-t border-white/30 transition-all duration-700 delay-400"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <div class="drop-shadow-md">
              <div class="text-xl sm:text-2xl md:text-3xl font-bold text-white" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5);">4+</div>
              <div class="text-white/80 text-[10px] sm:text-xs md:text-sm">{{ t.hero.statsCapacity }}</div>
            </div>
            <div class="drop-shadow-md">
              <div class="text-xl sm:text-2xl md:text-3xl font-bold text-white" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5);">500m</div>
              <div class="text-white/80 text-[10px] sm:text-xs md:text-sm">{{ t.hero.statsDistance }}</div>
            </div>
            <div class="drop-shadow-md">
              <div class="text-xl sm:text-2xl md:text-3xl font-bold text-white" style="text-shadow: 1px 1px 4px rgba(0,0,0,0.5);">5.0</div>
              <div class="text-white/80 text-[10px] sm:text-xs md:text-sm flex items-center gap-1">
                <i class="fa-solid fa-star text-[var(--color-gold)] text-[8px] sm:text-xs"></i>
                {{ t.hero.statsRating }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <a href="#features" class="text-white/60 hover:text-white transition-colors">
        <i class="fa-solid fa-chevron-down text-2xl"></i>
      </a>
    </div>
  </section>
</template>
