<script setup>
import ImageSlider from './ImageSlider.vue'

const services = [
  {
    id: 0,
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Pariatur eius placeat magnam nulla velit voluptatem possimus
      alias, delectus ducimus distinctio asperiores voluptas atque
      quidem vitae beatae! Reiciendis dicta eos nesciunt eum iure
      excepturi mollitia adipisci! Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Pariatur eius placeat magnam nulla
      velit voluptatem possimus alias, delectus ducimus distinctio
      asperiores voluptas atque quidem vitae beatae! Reiciendis dicta
      eos nesciunt eum iure excepturi mollitia adipisci! Lorem ipsum
      dolor sit, amet consectetur adipisicing elit. Pariatur eius
      placeat magnam nulla velit voluptatem possimus alias, delectus
      ducimus distinctio asperiores voluptas atque quidem vitae
      beatae! Reiciendis dicta eos nesciunt eum iure excepturi
      mollitia adipisci!`,
    images: ['/images/5.jpg', '/images/6.jpg', '/images/7.jpg', '/images/8.jpg'],
    imageFirst: false
  },
  {
    id: 1,
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Pariatur eius placeat magnam nulla velit voluptatem possimus
      alias, delectus ducimus distinctio asperiores voluptas atque
      quidem vitae beatae! Reiciendis dicta eos nesciunt eum iure
      excepturi mollitia adipisci! Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Pariatur eius placeat magnam nulla
      velit voluptatem possimus alias, delectus ducimus distinctio
      asperiores voluptas atque quidem vitae beatae! Reiciendis dicta
      eos nesciunt eum iure excepturi mollitia adipisci! Reiciendis
      dicta eos nesciunt eum iure excepturi mollitia adipisci! Lorem
      ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
      eius placeat magnam nulla velit voluptatem possimus alias,
      delectus ducimus distinctio asperiores voluptas atque quidem
      vitae beatae! Reiciendis dicta eos nesciunt eum iure excepturi
      mollitia adipisci!`,
    images: ['/images/1.jpeg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg'],
    imageFirst: true
  },
  {
    id: 2,
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Pariatur eius placeat magnam nulla velit voluptatem possimus
      alias, delectus ducimus distinctio asperiores voluptas atque
      quidem vitae beatae! Reiciendis dicta eos nesciunt eum iure
      excepturi mollitia adipisci! Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Pariatur eius placeat magnam nulla
      velit voluptatem possimus alias, delectus ducimus distinctio
      asperiores voluptas atque quidem vitae beatae! Reiciendis dicta
      eos nesciunt eum iure excepturi mollitia adipisci!`,
    images: ['/images/3.jpg', '/images/9.jpg', '/images/2.jpeg', '/images/1.jpeg'],
    imageFirst: false
  }
]
</script>

<template>
  <div id="apartment">
    <h1>Apartment</h1>
    <div class="services-list">
      <div 
        v-for="service in services" 
        :key="service.id" 
        class="service"
        :class="{ 'image-first': service.imageFirst }"
      >
        <template v-if="service.imageFirst">
          <div class="service-images">
            <ImageSlider :images="service.images" />
          </div>
          <div class="service-description text-left">
            <p>{{ service.description }}</p>
          </div>
        </template>
        <template v-else>
          <div class="service-description text-right">
            <p>{{ service.description }}</p>
          </div>
          <div class="service-images">
            <ImageSlider :images="service.images" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
#apartment {
  background: white;
  min-height: 100vh;
  padding: 2em 4em;
  position: relative;
  overflow: hidden;
}

#apartment h1 {
  font-size: 60px;
  text-align: center;
}

.services-list {
  display: block;
}

.service {
  padding: 3em 0;
  display: flex;
}

.service-description {
  flex-basis: 55%;
  width: 100%;
  font-size: 20px;
}

.service-description.text-right {
  text-align: right;
  padding-right: 6em;
}

.service-description.text-left {
  text-align: left;
  padding-left: 6em;
}

.service-description h2 {
  color: white;
  padding-bottom: 1em;
}

.service-images {
  flex-basis: 45%;
  width: 100%;
  height: 50vh;
  position: relative;
}

.service-images img {
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.5s;
}
</style>
