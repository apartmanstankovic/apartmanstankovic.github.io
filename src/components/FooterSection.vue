<script setup>
import { computed } from 'vue'
import { useI18n } from '../i18n/useI18n'

const { t } = useI18n()

const currentYear = new Date().getFullYear()

const quickLinks = computed(() => [
  { href: '#features', label: t.value.footer.aboutApartment },
  { href: '#gallery', label: t.value.nav.gallery },
  { href: '#location', label: t.value.nav.location },
  { href: '#booking', label: t.value.nav.booking },
])

const socialLinks = [
  { icon: 'fa-brands fa-instagram', href: '#', label: 'Instagram' },
  { icon: 'fa-brands fa-facebook-f', href: '#', label: 'Facebook' },
  { icon: 'fa-brands fa-whatsapp', href: 'https://wa.me/381642848080', label: 'WhatsApp' },
]
</script>

<template>
  <footer id="contact" class="bg-[var(--color-dark)] text-white">
    <!-- Main Footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-2">
          <div class="flex items-center gap-3 mb-4 sm:mb-6">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center">
              <span class="text-white font-bold text-lg sm:text-xl">AS</span>
            </div>
            <span class="font-[var(--font-display)] text-xl sm:text-2xl font-semibold">
              Apartman Stanković
            </span>
          </div>
          <p class="text-white/60 leading-relaxed mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
            {{ t.footer.description }}
          </p>
          
          <!-- Social Links -->
          <div class="flex gap-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              class="w-11 h-11 rounded-full bg-white/10 hover:bg-[var(--color-accent)] flex items-center justify-center transition-all duration-300"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-base sm:text-lg mb-4 sm:mb-6">{{ t.footer.quickLinks }}</h4>
          <ul class="space-y-3 sm:space-y-4">
            <li v-for="link in quickLinks" :key="link.href">
              <a 
                :href="link.href" 
                class="text-white/60 hover:text-white transition-colors flex items-center gap-2"
              >
                <i class="fa-solid fa-chevron-right text-xs text-[var(--color-accent)]"></i>
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="font-semibold text-base sm:text-lg mb-4 sm:mb-6">{{ t.footer.contactTitle }}</h4>
          <ul class="space-y-3 sm:space-y-4">
            <li>
              <a 
                href="tel:+381642848080" 
                class="text-white/60 hover:text-white transition-colors flex items-center gap-3"
              >
                <i class="fa-solid fa-phone text-[var(--color-accent)]"></i>
                +381 64 284 8080
              </a>
            </li>
            <li>
              <a 
                href="mailto:info@apartmanstankovic.rs" 
                class="text-white/60 hover:text-white transition-colors flex items-center gap-3"
              >
                <i class="fa-solid fa-envelope text-[var(--color-accent)]"></i>
                info@apartmanstankovic.rs
              </a>
            </li>
            <li class="flex items-start gap-3 text-white/60">
              <i class="fa-solid fa-location-dot text-[var(--color-accent)] mt-1"></i>
              <span>
                Kopaonik Resort<br>
                36354 Kopaonik, Srbija
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
        <p class="text-white/40 text-xs sm:text-sm text-center">
          &copy; {{ currentYear }} Apartman Stanković | {{ t.footer.copyright }} |
          <br class="sm:hidden">
          {{ t.footer.webDevelopment }} 
          <a href="https://github.com/BaneVredniMrav" target="_blank" rel="noopener" class="text-white/60 hover:text-white transition-colors"> BaneVredniMrav</a>
        </p>
      </div>
    </div>
  </footer>
</template>
