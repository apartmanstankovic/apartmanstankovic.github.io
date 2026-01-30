<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { href: '#features', label: 'Apartman' },
  { href: '#gallery', label: 'Galerija' },
  { href: '#location', label: 'Lokacija' },
  { href: '#booking', label: 'Rezervacija' },
  { href: '#contact', label: 'Kontakt' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-black/30 backdrop-blur-sm py-4 border-b border-white/10'"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-3">
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          :class="isScrolled ? 'bg-[var(--color-primary)]' : 'bg-white/20'"
        >
          <span class="text-white font-bold text-lg">AS</span>
        </div>
        <span 
          class="font-[var(--font-display)] text-xl font-semibold hidden sm:block transition-colors duration-300"
          :class="isScrolled ? 'text-[var(--color-primary)]' : 'text-white drop-shadow-md'"
        >
          Apartman Stanković
        </span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        <a 
          v-for="item in navItems" 
          :key="item.href"
          :href="item.href"
          class="nav-link font-medium transition-all duration-300"
          :class="isScrolled ? 'text-[var(--color-primary)] hover:text-[var(--color-accent)]' : 'text-white hover:text-[var(--color-gold)] drop-shadow-md'"
        >
          {{ item.label }}
        </a>
        <a 
          href="#booking" 
          class="btn-primary text-sm"
        >
          Rezerviši
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        @click="toggleMobileMenu"
        class="md:hidden p-2 rounded-lg transition-all duration-300"
        :class="isScrolled ? 'text-[var(--color-primary)]' : 'text-white drop-shadow-md'"
      >
        <i :class="isMobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" class="text-2xl"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t"
      >
        <div class="px-6 py-4 space-y-4">
          <a 
            v-for="item in navItems" 
            :key="item.href"
            :href="item.href"
            @click="closeMobileMenu"
            class="block py-2 text-[var(--color-primary)] font-medium hover:text-[var(--color-accent)] transition-colors"
          >
            {{ item.label }}
          </a>
          <a 
            href="#booking" 
            @click="closeMobileMenu"
            class="btn-primary text-center block"
          >
            Rezerviši
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>
