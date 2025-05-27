<template>
  <section>
    <ProductCarousel />
  </section>
  <section id="product-banners" class="mx-24 mt-8">
    <ProductBanner title="featured dice" category="1" />
  </section>
  <section id="product-banners" class="mx-24">
    <ProductBanner title="latest dice" category="2" />
  </section>
</template>

<script setup>
import ProductCarousel from '@/components/ProductCarousel.vue';
import ProductBanner from '@/components/ProductBanner.vue';

// import { get } from '@/services/networkService';
// get('products');
</script>

<style scoped></style>
