<template>
  <section id="shop">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row mt-4">
        <div id="filters" class="w-full md:w-1/4 p-4 hidden md:block">
          <div class="mb-6 pb-8 text-xl/9 italic mt-12">
            {{ currentCategory.description }}
          </div>
        </div>
        <div class="w-full md:w-3/4 p-4">
          <div class="text-desert-dark text-3xl font-bold font-[Cinzel] mt-1 mb-2">
            {{ currentCategory?.name }}
          </div>
          <div v-if="products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="product in products"
              :key="product.id"
              class="bg-white p-4 rounded-lg shadow shadow-slate-400">
              <RouterLink :to="`/product/${product.id}`">
                <img
                  :src="`${imageBaseUrl}/${product.coverImage}`"
                  class="w-full object-cover mb-4 rounded-lg" />
              </RouterLink>
              <div class="text-lg font-semibold">{{ product.name }}</div>
              <div class="flex items-center mb-4">
                <span class="text-lg text-primary">${{ product?.price.toFixed(2) }}</span>
              </div>
              <RouterLink :to="`/product/${product.id}`">
                <button type="button" class="button-primary">View Details</button>
              </RouterLink>
            </div>
          </div>
          <div v-else>
            <div class="mb-4">There are currently no items in this category</div>
            <button type="button" class="button-primary">
              Notify Me When Products Become Available
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';

const imageBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;
const route = useRoute();

const productStore = useProductStore();
const { products, categories } = storeToRefs(productStore);
const { getProductsByCategory } = productStore;

const currentCategory = computed(() => {
  return categories.value.find((c) => c.route === route.params.category);
});

watchEffect(async () => {
  await getProductsByCategory(route.params.category);
});
</script>

<style lang="scss" scoped></style>
