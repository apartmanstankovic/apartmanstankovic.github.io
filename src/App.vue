<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import GallerySection from './components/GallerySection.vue'
import LocationSection from './components/LocationSection.vue'
import BookingSection from './components/BookingSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-light)]">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <GallerySection />
    <LocationSection />
    <BookingSection />
    <FooterSection />
  </div>
</template>
