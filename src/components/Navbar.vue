<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from '../i18n/useI18n'

const { t, currentLanguage, toggleLanguage } = useI18n()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = computed(() => [
  { href: '#features', label: t.value.nav.apartment },
  { href: '#gallery', label: t.value.nav.gallery },
  { href: '#location', label: t.value.nav.location },
  { href: '#booking', label: t.value.nav.booking },
  { href: '#contact', label: t.value.nav.contact }
])

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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
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
      <div class="hidden lg:flex items-center gap-6">
        <a 
          v-for="item in navItems" 
          :key="item.href"
          :href="item.href"
          class="nav-link font-medium transition-all duration-300"
          :class="isScrolled ? 'text-[var(--color-primary)] hover:text-[var(--color-accent)]' : 'text-white hover:text-[var(--color-gold)] drop-shadow-md'"
        >
          {{ item.label }}
        </a>
        
        <!-- Language Switcher -->
        <button 
          @click="toggleLanguage"
          class="flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300"
          :class="isScrolled ? 'bg-gray-100 hover:bg-gray-200 text-[var(--color-primary)]' : 'bg-white/10 hover:bg-white/20 text-white'"
        >
          <i class="fa-solid fa-globe text-sm"></i>
          <span class="text-sm font-medium uppercase">{{ currentLanguage }}</span>
        </button>
        
        <a 
          href="#booking" 
          class="btn-primary text-sm"
        >
          {{ t.nav.bookNow }}
        </a>
      </div>

      <!-- Mobile: Language Switcher + Menu Button -->
      <div class="flex lg:hidden items-center gap-2">
        <!-- Language Switcher Mobile -->
        <button 
          @click="toggleLanguage"
          class="p-2 rounded-lg transition-all duration-300"
          :class="isScrolled ? 'text-[var(--color-primary)]' : 'text-white drop-shadow-md'"
        >
          <span class="text-sm font-bold uppercase">{{ currentLanguage }}</span>
        </button>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="p-2 rounded-lg transition-all duration-300"
          :class="isScrolled ? 'text-[var(--color-primary)]' : 'text-white drop-shadow-md'"
        >
          <i :class="isMobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" class="text-2xl"></i>
        </button>
      </div>
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
        class="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t"
      >
        <div class="px-4 py-4 space-y-1">
          <a 
            v-for="item in navItems" 
            :key="item.href"
            :href="item.href"
            @click="closeMobileMenu"
            class="block py-3 px-4 text-center text-[var(--color-primary)] font-medium rounded-xl transition-all duration-200 hover:bg-[var(--color-light)] hover:text-[var(--color-accent)] active:bg-[var(--color-accent)]/10 active:scale-[0.98]"
          >
            {{ item.label }}
          </a>
          <div class="pt-3">
            <a 
              href="#booking" 
              @click="closeMobileMenu"
              class="btn-primary text-center block w-full"
            >
              {{ t.nav.bookNow }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>