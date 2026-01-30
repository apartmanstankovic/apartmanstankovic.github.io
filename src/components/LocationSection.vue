<script setup>
const nearbyPlaces = [
  { icon: 'fa-solid fa-person-skiing', name: 'Ski centar', distance: '500m' },
  { icon: 'fa-solid fa-utensils', name: 'Restorani', distance: '200m' },
  { icon: 'fa-solid fa-shop', name: 'Prodavnice', distance: '300m' },
  { icon: 'fa-solid fa-spa', name: 'Spa centar', distance: 'U kompleksu' },
]
</script>

<template>
  <section id="location" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Content -->
        <div>
          <span class="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider">
            Lokacija
          </span>
          <h2 class="section-title text-[var(--color-primary)] mt-3 mb-6">
            U srcu Kopaonika
          </h2>
          <p class="text-gray-600 text-lg mb-8 leading-relaxed">
            Naš apartman se nalazi u ekskluzivnom kompleksu na Kopaoniku, 
            na idealnoj lokaciji koja vam omogućava lak pristup svim sadržajima 
            ovog popularnog ski centra.
          </p>
          <p class="text-gray-600 text-lg mb-10 leading-relaxed">
            Bilo da dolazite za zimski ski odmor ili letnje planinarenje, 
            naša lokacija je savršena polazna tačka za sve vaše avanture.
          </p>

          <!-- Nearby Places -->
          <div class="grid grid-cols-2 gap-6 mb-10">
            <div 
              v-for="(place, index) in nearbyPlaces" 
              :key="index"
              class="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-light)]"
            >
              <div class="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                <i :class="place.icon" class="text-white"></i>
              </div>
              <div>
                <div class="font-semibold text-[var(--color-primary)]">{{ place.name }}</div>
                <div class="text-sm text-gray-500">{{ place.distance }}</div>
              </div>
            </div>
          </div>

          <!-- Address -->
          <div class="flex items-start gap-4 p-6 rounded-2xl border-2 border-[var(--color-light)]">
            <div class="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
              <i class="fa-solid fa-location-dot text-white"></i>
            </div>
            <div>
              <div class="font-semibold text-[var(--color-primary)] mb-1">Adresa</div>
              <div class="text-gray-600">
                Kopaonik Resort<br>
                36354 Kopaonik, Srbija
              </div>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="relative">
          <div class="absolute -top-6 -left-6 w-24 h-24 bg-[var(--color-gold)]/20 rounded-full blur-2xl"></div>
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--color-accent)]/20 rounded-full blur-2xl"></div>
          
          <div class="relative rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23466.67680087491!2d20.798614849999998!3d43.2863889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4756f01c9dbfb9b5%3A0xb3c0b3e3b3b3b3b3!2sKopaonik!5e0!3m2!1sen!2srs!4v1700000000000!5m2!1sen!2srs"
              width="100%"
              height="500"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="rounded-3xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
