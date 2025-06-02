<template>
  <header class="bg-desert-dark">
    <div
      class="font-[Cinzel] text-desert-light max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
      <RouterLink to="/#">
        <div class="flex items-center">
          <div><img src="@/assets/logos/small_saguaro.svg" /></div>
          <div class="text-desert-meduim-dark font-bold text-2xl -ml-2.5">Desert Dice Company</div>
        </div>
      </RouterLink>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 justify-center lg:hidden focus:outline-none">
        <mdicon name="menu" size="30" />
      </button>
      <div class="hidden w-full lg:block lg:w-auto" id="navbar-default">
        <ul class="menu">
          <li class="menu-item" v-for="category in categories" :key="category.id">
            <RouterLink :to="`/products/${category.route}`">{{ category.name }}</RouterLink>
          </li>
          <li class="menu-item">
            <RouterLink to="/#" class="relative">
              <mdicon name="numeric-1-circle" class="absolute -top-3 -right-2.5" />
              <mdicon name="cart" size="27" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();
const { categories } = storeToRefs(productStore);
const { getProductCategories } = productStore;

onMounted(async () => {
  await getProductCategories();
});
</script>

<style scoped></style>
