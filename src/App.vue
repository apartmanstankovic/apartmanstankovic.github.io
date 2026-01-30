<script setup>
import AppHeader from './components/AppHeader.vue'
import ApartmentSection from './components/ApartmentSection.vue'
import ResortSection from './components/ResortSection.vue'
import KopaonikSection from './components/KopaonikSection.vue'
import ReservationSection from './components/ReservationSection.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <main>
    <ApartmentSection />
    <ResortSection />
    <KopaonikSection />
  </main>
  <ReservationSection />
  <AppFooter />
</template>

<style scoped>
</style>
