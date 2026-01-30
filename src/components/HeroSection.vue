<script setup>
import { ref, onMounted } from 'vue'

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
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-20 left-10 w-72 h-72 bg-[var(--color-gold)]/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl"></div>

    <!-- Content -->
    <div class="relative h-full flex items-center pt-20">
      <div class="max-w-7xl mx-auto px-6 w-full">
        <div class="max-w-3xl">
          <!-- Badge -->
          <div 
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 transition-all duration-700"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span class="text-white/90 text-sm font-medium">Dostupno za rezervaciju</span>
          </div>

          <!-- Main Title -->
          <h1 
            class="text-5xl md:text-7xl font-[var(--font-display)] font-bold text-white leading-tight mb-6 transition-all duration-700 delay-100"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            Vaše savršeno
            <span class="text-gradient block">utočište na Kopaoniku</span>
          </h1>

          <!-- Subtitle -->
          <p 
            class="text-xl text-white/80 leading-relaxed mb-10 max-w-xl transition-all duration-700 delay-200"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            Luksuzni apartman sa spektakularnim pogledom na planinske vrhove. 
            Idealno mesto za nezaboravan odmor tokom cele godine.
          </p>

          <!-- CTA Buttons -->
          <div 
            class="flex flex-wrap gap-4 transition-all duration-700 delay-300"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <a href="#booking" class="btn-primary">
              <i class="fa-regular fa-calendar-check mr-2"></i>
              Rezerviši termin
            </a>
            <a href="#gallery" class="btn-outline">
              <i class="fa-regular fa-images mr-2"></i>
              Pogledaj galeriju
            </a>
          </div>

          <!-- Stats -->
          <div 
            class="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/20 transition-all duration-700 delay-400"
            :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <div>
              <div class="text-3xl font-bold text-white">4+</div>
              <div class="text-white/60 text-sm">Gostiju kapacitet</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-white">500m</div>
              <div class="text-white/60 text-sm">Do ski staze</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-white">5.0</div>
              <div class="text-white/60 text-sm flex items-center gap-1">
                <i class="fa-solid fa-star text-[var(--color-gold)] text-xs"></i>
                Ocena gostiju
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
