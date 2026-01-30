<script setup>
import { ref } from 'vue'
import { useI18n } from '../i18n/useI18n'

const { t } = useI18n()

const images = [
  { src: '/images/1.jpeg', alt: 'Apartman pogled 1', span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/3.jpg', alt: 'Apartman pogled 2', span: '' },
  { src: '/images/4.jpg', alt: 'Apartman pogled 3', span: '' },
  { src: '/images/5.jpg', alt: 'Apartman pogled 4', span: '' },
  { src: '/images/6.jpg', alt: 'Apartman pogled 5', span: '' },
  { src: '/images/7.jpg', alt: 'Apartman pogled 6', span: 'col-span-2' },
  { src: '/images/8.jpg', alt: 'Apartman pogled 7', span: '' },
  { src: '/images/9.jpg', alt: 'Apartman pogled 8', span: '' },
]

const lightboxOpen = ref(false)
const currentImageIndex = ref(0)

const openLightbox = (index) => {
  currentImageIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length
}

const prevImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? images.length - 1 
    : currentImageIndex.value - 1
}

const handleKeydown = (e) => {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

// Add keyboard listener
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}
</script>

<template>
  <section id="gallery" class="py-16 sm:py-20 md:py-24 bg-[var(--color-light)]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <span class="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider">
          {{ t.gallery.subtitle }}
        </span>
        <h2 class="section-title text-[var(--color-primary)] mt-3 mb-6">
          {{ t.gallery.title }}
        </h2>
        <p class="text-gray-600 text-lg">
          {{ t.gallery.description }}
        </p>
      </div>

      <!-- Gallery Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 auto-rows-[150px] sm:auto-rows-[200px]">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          :class="['img-zoom rounded-2xl cursor-pointer group relative', image.span]"
          @click="openLightbox(index)"
        >
          <img 
            :src="image.src" 
            :alt="image.alt"
            class="w-full h-full object-cover rounded-2xl"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl flex items-center justify-center">
            <i class="fa-solid fa-expand text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          @click.self="closeLightbox"
        >
          <!-- Close Button -->
          <button 
            @click="closeLightbox"
            class="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
          >
            <i class="fa-solid fa-xmark text-3xl"></i>
          </button>

          <!-- Navigation -->
          <button 
            @click="prevImage"
            class="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <i class="fa-solid fa-chevron-left text-lg sm:text-xl"></i>
          </button>
          <button 
            @click="nextImage"
            class="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <i class="fa-solid fa-chevron-right text-lg sm:text-xl"></i>
          </button>

          <!-- Image -->
          <img 
            :src="images[currentImageIndex].src"
            :alt="images[currentImageIndex].alt"
            class="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
          />

          <!-- Counter -->
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {{ currentImageIndex + 1 }} / {{ images.length }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
