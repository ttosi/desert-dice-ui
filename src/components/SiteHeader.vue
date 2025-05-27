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
        class="inline-flex items-center p-2 justify-center md:hidden focus:outline-none">
        <mdicon name="menu" size="30" />
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="menu">
          <li class="menu-item" v-for="category in categories" :key="category.id">
            <RouterLink :to="`/products/${category.code}`">{{ category.name }}</RouterLink>
          </li>
          <li class="menu-item">
            <RouterLink to="/#">CUSTOM SETS</RouterLink>
          </li>
          <li class="menu-item">
            <RouterLink to="/#"><mdicon name="cart" size="25" /></RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { getLookupByKey } from '@/services/lookupsService';

const categories = ref();

onMounted(async () => {
  categories.value = getLookupByKey('productcategory');
});
</script>

<style scoped></style>
