<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)

const currentImage = computed(() => props.images[currentIndex.value])

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 
    ? props.images.length - 1 
    : currentIndex.value - 1
}
</script>

<template>
  <div class="img-slider">
    <img :src="currentImage" class="slide-img" />
    <button @click="prevSlide" class="prev-slide-btn">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button @click="nextSlide" class="next-slide-btn">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </div>
</template>

<style scoped>
.img-slider {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 1em;
}

.img-slider img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.5s;
}

.img-slider img:hover {
  transform: scale(1.1);
}

.img-slider button {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  background: none;
  outline: none;
  border: none;
  color: silver;
  cursor: pointer;
}

.prev-slide-btn {
  left: 1em;
}

.next-slide-btn {
  right: 1em;
}

.img-slider button i {
  font-size: 3em;
  transition: all 0.3s ease-in-out;
}

.img-slider button:hover i {
  color: white;
}
</style>
