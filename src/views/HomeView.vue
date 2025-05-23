<template>
  <section>
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
  </section>
  <section id="product-banners" class="mx-24 mt-8">
    <div class="container mx-auto">
      <div class="font-bold text-2xl mb-2">Featured Dice</div>
      <div class="flex flex-wrap">
        <!-- Category 1 -->
        <div class="w-full sm:w-1/3 px-4 mb-8">
          <div class="category-banner relative overflow-hidden rounded-lg shadow-lg group">
            <img src="@/assets/cat-image1.jpg" alt="Category 1" class="w-full h-auto" />
            <div class="absolute inset-0 bg-gray-light bg-opacity-50"></div>
            <div
              class="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              <h2 class="text-2xl md:text-3xl font-bold mb-4">Men</h2>
              <a
                href="/"
                class="bg-primary hover:bg-transparent border border-transparent hover:border-white text-white hover:text-white font-semibold px-4 py-2 rounded-full inline-block">
                Shop now
              </a>
            </div>
          </div>
        </div>
        <!-- Category 2 -->
        <div class="w-full sm:w-1/3 px-4 mb-8">
          <div class="category-banner relative overflow-hidden rounded-lg shadow-lg group">
            <img src="@/assets/cat-image4.jpg" alt="Category 2" class="w-full h-auto" />
            <div class="absolute inset-0 bg-gray-light bg-opacity-50"></div>
            <div
              class="category-text absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 transition duration-300">
              <h2 class="text-2xl md:text-3xl font-bold mb-4">Women</h2>
              <a
                href="/"
                class="bg-red-600 hover:bg-transparent border border-transparent hover:border-white text-white hover:text-white font-semibold px-4 py-2 rounded-full inline-block">
                Shop now
              </a>
            </div>
          </div>
        </div>
        <!-- Category 3 -->
        <div class="w-full sm:w-1/3 px-4 mb-8">
          <div class="category-banner relative overflow-hidden rounded-lg shadow-lg group">
            <img src="@/assets/cat-image5.jpg" alt="Category 3" class="w-full h-auto" />
            <div class="absolute inset-0 bg-gray-light bg-opacity-50"></div>
            <div
              class="category-text absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 transition duration-300">
              <h2 class="text-2xl md:text-3xl font-bold mb-4">Accessories</h2>
              <a
                href="/"
                class="bg-primary hover:bg-transparent border border-transparent hover:border-white text-white hover:text-white font-semibold px-4 py-2 rounded-full inline-block">
                Shop now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="product-banners" class="mx-24">
    <div class="container mx-auto">
      <div class="font-bold text-2xl mb-2">Latest Dice</div>
      <div class="flex flex-wrap">
        <!-- Category 1 -->
        <div class="w-full sm:w-1/3 px-4 mb-8">
          <div class="category-banner relative overflow-hidden rounded-lg shadow-lg group">
            <img src="@/assets/cat-image1.jpg" alt="Category 1" class="w-full h-auto" />
            <div class="absolute inset-0 bg-gray-light bg-opacity-50"></div>
            <div
              class="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              <h2 class="text-2xl md:text-3xl font-bold mb-4">Men</h2>
              <a
                href="/"
                class="bg-primary hover:bg-transparent border border-transparent hover:border-white text-white hover:text-white font-semibold px-4 py-2 rounded-full inline-block">
                Shop now
              </a>
            </div>
          </div>
        </div>
        <!-- Category 2 -->
        <div class="w-full sm:w-1/3 px-4 mb-8">
          <div class="category-banner relative overflow-hidden rounded-lg shadow-lg group">
            <img src="@/assets/cat-image4.jpg" alt="Category 2" class="w-full h-auto" />
            <div class="absolute inset-0 bg-gray-light bg-opacity-50"></div>
            <div
              class="category-text absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 transition duration-300">
              <h2 class="text-2xl md:text-3xl font-bold mb-4">Women</h2>
              <a
                href="/"
                class="bg-red-600 hover:bg-transparent border border-transparent hover:border-white text-white hover:text-white font-semibold px-4 py-2 rounded-full inline-block">
                Shop now
              </a>
            </div>
          </div>
        </div>
        <!-- Category 3 -->
        <div class="w-full sm:w-1/3 px-4 mb-8">
          <div class="category-banner relative overflow-hidden rounded-lg shadow-lg group">
            <img src="@/assets/cat-image5.jpg" alt="Category 3" class="w-full h-auto" />
            <div class="absolute inset-0 bg-gray-light bg-opacity-50"></div>
            <div
              class="category-text absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 transition duration-300">
              <h2 class="text-2xl md:text-3xl font-bold mb-4">Accessories</h2>
              <a
                href="/"
                class="bg-primary hover:bg-transparent border border-transparent hover:border-white text-white hover:text-white font-semibold px-4 py-2 rounded-full inline-block">
                Shop now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

const carouselConfig = {
  itemsToShow: 1,
  gap: 5,
  snapAlign: 'center',
  autoplay: 4000,
  wrapAround: true,
  pauseAutoplayOnHover: false,
  breakpointMode: 'viewport',
};
</script>

<style scoped></style>
