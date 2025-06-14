<template>
  <div>
    <div class="carousel__wrapper">
      <Carousel ref="carousel" v-bind="carouselConfig">
        <Slide v-for="item in carouselItems" :key="item.id">
          <img class="w-full" :src="`${imageBaseUrl}/${item.path}`" />
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/carousel.css';

const imageBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;
const carousel = ref(null);
const carouselConfig = {
  itemsToShow: 1,
  gap: 5,
  snapAlign: 'center',
  wrapAround: true,
  autoplay: 5000,
  pauseAutoplayOnHover: false,
  breakpointMode: 'viewport',
};

const carouselItems = [
  { id: 1, path: 'banners/1000000716.png' },
  { id: 2, path: 'banners/1000000713.png' },
  { id: 3, path: 'banners/1000000714.png' },
  { id: 4, path: 'banners/1000000712.png' },
];
</script>

<style scoped></style>
