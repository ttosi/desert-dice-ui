<template>
  <div>
    <div class="carousel__wrapper">
      <Carousel ref="carousel" v-bind="carouselConfig">
        <Slide v-for="item in carouselItems" :key="item.id">
          <img class="w-full" :src="`/src/assets/${item.path}`" />
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
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

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
  { id: 1, path: 'banners/20250523_115502.jpg' },
  { id: 2, path: 'banners/1000000712.png' },
  { id: 3, path: 'banners/1000000714.png' },
  { id: 4, path: 'banners/1000000716.png' },
];
</script>

<style scoped></style>
