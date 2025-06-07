<template>
  <nav class="bg-desert-dark font-[Cinzel] text-desert-light shadow-md sticky top-0 z-50">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <RouterLink to="/">
        <div class="font-bold text-xl md:text-2xl">Desert Dice Company</div>
      </RouterLink>
      <button
        @click="showMenu = !showMenu"
        class="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden">
        <mdicon name="menu"></mdicon>
      </button>
      <div class="w-full md:block md:w-auto" :class="{ hidden: !showMenu }">
        <ul class="menu">
          <li v-for="category in categories" :key="category.id">
            <RouterLink :to="category.route">
              <button class="menu-item">{{ category.name }}</button>
            </RouterLink>
          </li>
          <li class="menu-item relative">
            <mdicon name="cart" size="27" />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import { useProductStore } from '@/stores/productStore';

const showMenu = ref(false);

const productStore = useProductStore();
const { categories } = storeToRefs(productStore);
const { getProductCategories } = productStore;

onMounted(async () => {
  await getProductCategories();
});
</script>

<style scoped></style>
