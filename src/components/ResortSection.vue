<script setup>
import { ref, computed } from 'vue'
import ImageSlider from './ImageSlider.vue'

const tabs = [
  {
    id: 0,
    title: 'Recepcion',
    content: `Imademo jean apartment na Kopaonik dje ce gi izdajemo al gi
      necemo izdajemo za mali novci je ce si takoj upropastimo
      trziste no cemo si gi izdajemo za novci kako valja da si ne bi
      bilo belaja.`
  },
  {
    id: 1,
    title: 'Restaurant',
    content: `Bla bla bla Bla bla bla Bla bla bla Bla bla bla Bla bla bla
      Bla bla bla Bla bla bla Bla bla bla Bla bla bla Bla bla bla
      Bla bla bla Bla bla bla Bla bla bla Bla bla bla Bla bla bla
      Bla bla bla Bla bla bla Bla bla bla Bla bla bla Bla bla bla
      Bla bla bla Bla bla bla Bla bla bla Bla bla bla Bla bla bla
      Bla bla bla Bla bla bla Bla bla bla Bla bla bla Bla bla bla`
  },
  {
    id: 2,
    title: 'Spa Center',
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Harum, corrupti!Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Harum, corrupti!Lorem ipsum dolor sit amet,
      consectetur adipisicing elit. Harum, corrupti!Lorem ipsum
      dolor sit amet, consectetur adipisicing elit. Harum,
      corrupti!Lorem ipsum dolor sit amet, consectetur adipisicing
      elit. Harum, corrupti!`
  },
  {
    id: 3,
    title: 'Locations',
    content: `map map map map map map map map map map map map map map map
      map map map map map map map map map map map map map map map
      map map map map map map map map map map map map map map map
      map map map map map map map map map map map map map map map
      map map map map map map map map map map map map map map map`
  }
]

const resortImages = [
  ['/images/1.jpeg', '/images/2.jpeg', '/images/3.jpg', '/images/4.jpg'],
  ['/images/5.jpg', '/images/6.jpg', '/images/7.jpg', '/images/8.jpg'],
  ['/images/3.jpg', '/images/9.jpg', '/images/2.jpeg', '/images/1.jpeg']
]

const activeTabIndex = ref(0)

const currentImages = computed(() => {
  if (activeTabIndex.value < resortImages.length) {
    return resortImages[activeTabIndex.value]
  }
  return resortImages[0]
})

const showMap = computed(() => activeTabIndex.value === tabs.length - 1)

const setActiveTab = (index) => {
  activeTabIndex.value = index
}
</script>

<template>
  <div id="resort">
    <h1>Resort</h1>
    <div class="info-tabs">
      <ul class="tab-titles">
        <li 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          class="tab-link"
          :class="{ active: activeTabIndex === index }"
          @click="setActiveTab(index)"
        >
          {{ tab.title }}
        </li>
      </ul>
      <div class="tab">
        <div 
          v-for="(tab, index) in tabs" 
          :key="tab.id"
          class="tab-content"
          :class="{ active: activeTabIndex === index }"
        >
          <ul>
            <li>{{ tab.content }}</li>
          </ul>
        </div>
        <div class="resort-slider-container">
          <ImageSlider 
            v-if="!showMap" 
            :images="currentImages" 
          />
          <div v-else class="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5602.760969031454!2d20.408104249393038!3d44.85251193978067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a65b4f2b460e5%3A0xddc813c75170a20e!2sKajak%20Kanu%20klub%20%22Zmaj%22%20Zemun!5e0!3m2!1ssr!2srs!4v1683058790681!5m2!1ssr!2srs"
              width="600"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#resort {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 2em 4em;
  flex-wrap: wrap;
}

#resort h1 {
  font-size: 60px;
  text-align: center;
}

.info-tabs {
  padding: 0 1em;
  justify-content: center;
}

.info-tabs .tab-titles {
  width: 80%;
  display: flex;
  height: 4em;
  margin: auto;
  list-style: none;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.info-tabs .tab-titles .tab-link {
  color: rgb(88, 88, 88);
  min-width: 3.2em;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: 0.5s ease-in-out;
}

.info-tabs .tab-titles .tab-link.active {
  font-size: 24px;
}

.info-tabs .tab-titles .tab-link:hover,
.info-tabs .tab-titles .tab-link.active {
  color: var(--primaryColor);
}

.info-tabs .tab-titles .tab-link::before {
  content: "";
  position: absolute;
  left: 50%;
  background: var(--primaryColor);
  width: 0;
  height: 3px;
  bottom: -1px;
  transition: 0.5s ease;
}

.info-tabs .tab-titles .tab-link:hover::before,
.info-tabs .tab-titles .tab-link.active:before {
  position: absolute;
  width: 60%;
  height: 3px;
}

.info-tabs .tab-titles .tab-link::after {
  content: "";
  position: absolute;
  right: 50%;
  background: var(--primaryColor);
  width: 0;
  height: 3px;
  bottom: -1px;
  transition: 0.5s ease;
}

.info-tabs .tab-titles .tab-link:hover::after,
.info-tabs .tab-titles .tab-link.active:after {
  position: absolute;
  width: 60%;
  height: 3px;
}

.tab {
  display: flex;
  padding: 1em 0;
  gap: 2em;
}

.info-tabs .tab-content {
  display: none;
  padding-top: 2em;
  flex-basis: 40%;
}

.info-tabs .tab-content.active {
  display: block;
}

.resort-slider-container {
  width: 100%;
  height: 60vh;
  flex-basis: 60%;
}

.map {
  width: 100%;
  height: 100%;
  border-radius: 1em;
  overflow: hidden;
}

.map iframe {
  width: 100%;
  height: 100%;
}
</style>
