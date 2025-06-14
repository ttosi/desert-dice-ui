<template>
  <nav class="bg-desert-dark font-[Cinzel] text-desert-light shadow-md sticky top-0 z-50">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <RouterLink to="/">
        <div class="font-bold text-xl md:text-2xl">Desert Dice Company</div>
      </RouterLink>
      <button
        @click="showMenu = !showMenu"
        ref="menubutton"
        class="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden">
        <Icon icon="mdi:menu" height="25" />
      </button>
      <div class="w-full md:block md:w-auto" :class="{ hidden: !showMenu }">
        <ul class="menu">
          <li v-for="category in categories" :key="category.id">
            <RouterLink :to="category.route">
              <button class="menu-item">{{ category.name }}</button>
            </RouterLink>
          </li>
          <li class="menu-item relative">
            <RouterLink to="/cart">
              <Icon
                v-if="cart.length"
                :icon="`mdi:numeric-${cart.length}-circle`"
                height="22"
                class="hidden md:block absolute top-0 md:left-6" />
              <Icon icon="mdi:cart" height="25" />
            </RouterLink>
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
import { onClickOutside } from '@vueuse/core';
import { Icon } from '@iconify/vue';

import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';

const showMenu = ref(false);
const menubutton = ref();

const productStore = useProductStore();
const { categories } = storeToRefs(productStore);
const { getProductCategories } = productStore;

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

onClickOutside(menubutton, () => (showMenu.value = false));

onMounted(async () => {
  await getProductCategories();
});
</script>

<style scoped></style>
