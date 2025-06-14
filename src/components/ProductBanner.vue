<template>
  <div>
    <div class="container mx-auto">
      <div class="font-[Ceinzel] font-bold text-desert-medium-dark text-2xl uppercase mb-2">
        {{ title }}
      </div>
      <div class="flex flex-wrap">
        <div class="w-full sm:w-1/3 px-4 mb-8" v-for="product in featured" :key="product.id">
          <div
            class="category-banner relative overflow-hidden rounded-lg shadow-lg group object-cover">
            <img :src="`${imageBaseUrl}/${product.path}`" />
            <div class="absolute inset-0 bg-gray-light bg-opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const imageBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

defineProps({
  title: String,
  category: String,
  count: String,
});

/* featured mock data */
const featured = [
  { id: 1, name: 'Cool Dice Name 1', path: 'dice/20250601_172248.png' },
  { id: 2, name: 'Cool Dice Name 2', path: 'dice/20250601_111213.png' },
  { id: 3, name: 'Cool Dice Name 3', path: 'dice/20250601_111213.png' },
];
</script>

<style lang="scss" scoped></style>
