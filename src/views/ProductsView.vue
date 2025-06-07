<template>
  <section id="shop" class="mt-8">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row mt-4">
        <div id="filters" class="w-full md:w-1/5 p-4 hidden md:block mr-10">
          <div class="text-desert-dark text-3xl font-bold font-[Cinzel] mt-1 mb-2">
            {{ currentCategory?.name }}
          </div>
          <div class="mb-6 pb-8 text-lg/7 italic">
            {{ currentCategory.description }}
          </div>
        </div>
        <div class="w-full md:w-4/5 p-4">
          <div v-if="products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="product in products"
              :key="product.id"
              class="bg-white rounded-lg shadow shadow-slate-400">
              <div class="" style="padding: 15px">
                <RouterLink :to="`/product/${product.id}`">
                  <img
                    :src="`${imageBaseUrl}/${product.coverImagePath}`"
                    class="w-full object-cover mb-4 rounded-lg max-h-96" />
                </RouterLink>
                <div class="text-lg font-semibold">{{ product.name }}</div>
                <div class="flex items-center mb-4">
                  <span class="text-lg text-primary">${{ product?.coverPrice.toFixed(2) }}</span>
                </div>
                <RouterLink :to="`/product/${product.id}`">
                  <button type="button" class="button-primary">View Details</button>
                </RouterLink>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="mt-3 mb-4">
              Nothing here right now! Check back, or even better, sign up to get notified. You won't
              be dissapointed.
            </div>
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
  return categories.value.find((c) => c.code === route.params.category);
});

watchEffect(async () => {
  await getProductsByCategory(route.params.category);
});
</script>

<style scoped></style>
