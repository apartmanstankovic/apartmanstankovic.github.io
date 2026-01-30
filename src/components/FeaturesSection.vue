<script setup>
const features = [
  {
    icon: 'fa-solid fa-bed',
    title: 'Udoban smeštaj',
    description: 'Prostrani apartman sa modernim nameštajem i svim potrebnim sadržajima za ugodan boravak.'
  },
  {
    icon: 'fa-solid fa-mountain-sun',
    title: 'Spektakularan pogled',
    description: 'Uživajte u breathtaking pogledu na planinske vrhove direktno sa vaše terase.'
  },
  {
    icon: 'fa-solid fa-person-skiing',
    title: 'Blizina ski staza',
    description: 'Samo 500 metara od glavnih skijaških staza i žičara Kopaonika.'
  },
  {
    icon: 'fa-solid fa-wifi',
    title: 'Brzi WiFi',
    description: 'Besplatan brzi internet za sve vaše potrebe - rad ili zabava.'
  },
  {
    icon: 'fa-solid fa-car',
    title: 'Privatni parking',
    description: 'Obezbeđeno parking mesto u sklopu kompleksa, potpuno besplatno.'
  },
  {
    icon: 'fa-solid fa-spa',
    title: 'Wellness & Spa',
    description: 'Pristup spa centru sa saunom, đakuzijem i relax zonom u sklopu rizorta.'
  }
]

const amenities = [
  'Klima uređaj',
  'Centralno grejanje',
  'Potpuno opremljena kuhinja',
  'Smart TV',
  'Mašina za veš',
  'Sef za vrednosti',
  'Posteljina i peškiri',
  '24/7 recepcija'
]
</script>

<template>
  <section id="features" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider">
          Zašto mi
        </span>
        <h2 class="section-title text-[var(--color-primary)] mt-3 mb-6">
          Sve što vam treba za savršen odmor
        </h2>
        <p class="text-gray-600 text-lg">
          Naš apartman je pažljivo dizajniran da vam pruži maksimalan komfor 
          i nezaboravno iskustvo boravka na Kopaoniku.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="group p-8 rounded-2xl bg-[var(--color-light)] card-hover cursor-default"
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
      <div class="relative rounded-3xl overflow-hidden">
        <div class="absolute inset-0">
          <img 
            src="/images/4.jpg" 
            alt="Apartman enterijer" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-[var(--color-primary)]/90"></div>
        </div>
        
        <div class="relative p-12 md:p-16">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 class="text-3xl font-[var(--font-display)] font-semibold text-white mb-4">
                Potpuno opremljen apartman
              </h3>
              <p class="text-white/70 text-lg mb-8">
                Sve što vam treba za udoban boravak već vas čeka. 
                Samo dođite i uživajte.
              </p>
              <a href="#booking" class="btn-primary">
                Rezerviši sada
              </a>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div 
                v-for="(amenity, index) in amenities" 
                :key="index"
                class="flex items-center gap-3 text-white/90"
              >
                <i class="fa-solid fa-check text-[var(--color-gold)]"></i>
                <span>{{ amenity }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
