<template>
  <div>
    <div class="carousel__wrapper">
      <Carousel v-bind="carouselConfig">
        <Slide><img class="w-full" src="@/assets/20250523_115502.jpg" /></Slide>
        <Slide><img class="w-full" src="@/assets/1000000712.png" /></Slide>
        <Slide><img class="w-full" src="@/assets/1000000714.png" /></Slide>
        <Slide><img class="w-full" src="@/assets/1000000713.png" /></Slide>
        <Slide><img class="w-full" src="@/assets/1000000716.png" /></Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

const carouselConfig = {
  itemsToShow: 1,
  gap: 5,
  snapAlign: 'center',
  wrapAround: true,
  pauseAutoplayOnHover: false,
  breakpointMode: 'viewport',
};
</script>

<style scoped></style>
