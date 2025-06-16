<template>
  <section id="shop" class="mt-8">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row mt-4">
        <div id="filters" class="w-full md:w-1/5 p-4 md:block hidden mr-10">
          <div class="mb-6 pb-8 border-b border-gray-line">
            <h3 class="text-xl font-bold font-[Cinzel] text-desert-dark mb-6 mt-1.5">Filters</h3>
            <div class="space-y-2 ml-2">
              <!-- <label class="flex items-center">
                <input
                  v-model="selectedTags"
                  value="all"
                  type="checkbox"
                  class="form-checkbox custom-checkbox" />
                <span class="ml-2">All</span>
              </label> -->
              <label v-for="tag in tags" :key="tag.id" class="flex items-center">
                <input
                  v-model="selectedTags"
                  :value="tag.code"
                  type="checkbox"
                  class="form-checkbox custom-checkbox" />
                <span class="ml-2">{{ tag.name }}</span>
              </label>
            </div>
          </div>
          <div class="mb-6 text-lg/7 md:block sm:text-md italic">
            {{ currentCategory?.description }}
          </div>
        </div>
        <div class="w-full md:w-4/5 p-4">
          <div class="text-desert-dark text-3xl font-bold font-[Cinzel] mt-1 mb-2">
            {{ currentCategory?.name }}
          </div>
          <div v-if="products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="product in availableProducts"
              :key="product.id"
              class="bg-white rounded-lg shadow shadow-slate-400">
              <div class="" style="padding: 15px">
                <div class="relative">
                  <RouterLink :to="`/product/${product.id}`">
                    <img
                      :src="`${imageBaseUrl}/${product.coverImagePath}`"
                      class="w-full mb-4 rounded-lg" />
                    <!-- <span class="badge">Misfit</span> -->
                  </RouterLink>
                </div>
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
              <div class="font-bold">Nothing here at the moment.</div>
              Check back or sign up to get notified when new dice sets are added to the store.
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
import { ref, computed, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';

const imageBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;
const route = useRoute();
const selectedTags = ref([]);

const productStore = useProductStore();
const { products, categories, tags } = storeToRefs(productStore);
const { getProductsByCategory, getProductTags } = productStore;

const currentCategory = computed(() => {
  return categories.value.find((c) => c.code === route.params.category);
});

const availableProducts = computed(() => {
  // return products.filter((product) =>
  //   product.tags.some((tag) => selectedTags.value.includes(tag.code))
  // );
  return products.value.filter((p) => !p.isSold);
});

watchEffect(async () => {
  await getProductsByCategory(route.params.category);
  await getProductTags(route.params.category);
  console.log(tags);
});
</script>

<style scoped></style>
