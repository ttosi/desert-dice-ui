<template>
  <header>
    <v-app-bar app color="desert-dark font-[Cinzel]" class="text-desert-light">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-sm-none">
        <mdicon name="menu"></mdicon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="ml-6">
        <RouterLink to="/">
          <div class="flex items-center">
            <!-- <div class="text-desert-light font-bold text-2xl">Desert Dice Company</div> -->
            <div><img src="@/assets/logos/small_saguaro.svg" /></div>
            <div class="relative text-desert-meduim-dark font-bold text-2xl -left-2">
              Desert Dice Company
            </div>
          </div>
        </RouterLink>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-sm-flex mr-5">
        <v-btn
          v-for="category in categories"
          :key="category.id"
          :to="`/products/${category.route}`">
          <span class="font-bold text-lg">{{ category.name }}</span>
        </v-btn>
      </div>
      <v-btn to="/cart" :active="false" class="mr-3">
        <span class="font-bold text-lg">
          <mdicon name="numeric-1-circle" class="absolute -top-1.5 right-2" />
          <mdicon name="cart" size="27" />
        </span>
      </v-btn>
    </v-app-bar>
    <!-- * mobile -->
    <v-navigation-drawer v-model="drawer" temporary class="d-sm-none">
      <v-list>
        <v-list-item
          v-for="category in categories"
          :key="category.id"
          :to="`/products/${category.route}`">
          <v-list-item-title>
            <div class="text-desert-dark text-xl font-bold">
              {{ category.name }}
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();
const { categories } = storeToRefs(productStore);
const { getProductCategories } = productStore;

const drawer = ref(false);

onMounted(async () => {
  await getProductCategories();
});
</script>

<style scoped>
.no-active-class {
  background-color: transparent !important;
  color: inherit !important;
}
</style>
