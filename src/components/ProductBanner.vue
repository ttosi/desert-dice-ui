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
            <img :src="`/src/assets/${product.path}`" class="" />
            <div class="absolute inset-0 bg-gray-light bg-opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  category: String,
  size: String,
});

/* featured mock data */
const featured = [
  { id: 1, name: 'Cool Dice Name 1', path: 'dice/20250420_091540.jpg' },
  { id: 2, name: 'Cool Dice Name 2', path: 'dice/20250316_143711.jpg' },
  { id: 3, name: 'Cool Dice Name 3', path: 'dice/20250102_162901.jpg' },
];

console.log(`@/assets/${featured[0].path}`);

console.log(props.title);
</script>

<style lang="scss" scoped></style>
