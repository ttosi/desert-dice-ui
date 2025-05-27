<template>
  <!-- <div class="flex justify-center">
    <div class="flex w-2/3 border border-amber-300">
      <div
        class="flex flex-col flex-wrap md:flex-row md:gap-8 gap-2 justify-center border border-amber-950">
        <div class="w-1/4"><img src="@/assets/dice/dice1.png" /></div>
        <div class="w-1/4"><img src="@/assets/dice/dice1.png" /></div>
        <div class="w-1/4"><img src="@/assets/dice/dice1.png" /></div>
        <div class="w-1/4"><img src="@/assets/dice/dice1.png" /></div>
        <div class="w-1/4"><img src="@/assets/dice/dice1.png" /></div>
        <div class="w-1/4"><img src="@/assets/dice/dice1.png" /></div>
      </div>
    </div>
  </div> -->
  <section id="shop">
    <div class="container mx-auto">
      <!-- Top Filter -->
      <!-- <div class="flex flex-col md:flex-row justify-between items-center py-4">
        <div class="flex items-center space-x-4">
          <button
            class="bg-primary text-white hover:bg-transparent hover:text-primary border hover:border-primary py-2 px-4 rounded-full focus:outline-none">
            Show On Sale
          </button>
          <button
            class="bg-primary text-white hover:bg-transparent hover:text-primary border hover:border-primary py-2 px-4 rounded-full focus:outline-none">
            List View
          </button>
          <button
            class="bg-primary text-white hover:bg-transparent hover:text-primary border hover:border-primary py-2 px-4 rounded-full focus:outline-none">
            Grid View
          </button>
        </div>
        <div class="flex mt-5 md:mt-0 space-x-4">
          <div class="relative">
            <select
              class="block appearance-none w-full bg-white border hover:border-primary px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline">
              <option>Sort by Latest</option>
              <option>Sort by Popularity</option>
              <option>Sort by A-Z</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center px-2">
              <img
                id="arrow-down"
                class="h-4 w-4"
                src="/assets/images/filter-down-arrow.svg"
                alt="filter arrow" />
              <img
                id="arrow-up"
                class="h-4 w-4 hidden"
                src="/assets/images/filter-up-arrow.svg"
                alt="filter arrow" />
            </div>
          </div>
        </div>
      </div> -->
      <!-- Filter Toggle Button for Mobile -->
      <div class="block md:hidden text-center mb-4">
        <button
          id="products-toggle-filters"
          class="bg-primary text-white py-2 px-4 rounded-full focus:outline-none">
          Show Filters
        </button>
      </div>
      <div class="flex flex-col md:flex-row">
        <!-- Filters -->
        <div id="filters" class="w-full md:w-1/4 p-4 hidden md:block">
          <!-- Category Filter -->
          <div class="mb-6 pb-8 border-b border-gray-line">
            <h3 class="text-lg font-semibold mb-6">Category</h3>
            <div class="space-y-2">
              <label v-for="category in categories" :key="category.id" class="flex items-center">
                <input type="checkbox" class="form-checkbox custom-checkbox" />
                <span class="ml-2">{{ category.name }}</span>
              </label>
              <!-- <label class="flex items-center">
                <input type="checkbox" class="form-checkbox custom-checkbox" />
                <span class="ml-2">Collections</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="form-checkbox custom-checkbox" />
                <span class="ml-2">Dice Cases</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="form-checkbox custom-checkbox" />
                <span class="ml-2">Jewelry</span>
              </label> -->
            </div>
          </div>
          <!-- Rating Filter -->
          <!-- <div class="mb-6">
            <h3 class="text-lg font-semibold mb-6">Rating</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input type="checkbox" class="form-checkbox custom-checkbox" />
                <span class="ml-2">★★★★★</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="form-checkbox custom-checkbox" />
                <span class="ml-2">★★★★☆</span>
              </label>
              <label class="flex items-center">
                <input type="checkbox" class="form-checkbox custom-checkbox" />
                <span class="ml-2">★★★☆☆</span>
              </label>
            </div>
          </div> -->
        </div>
        <!-- Products List -->
        <div class="w-full md:w-3/4 p-4">
          <!-- Products grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Product 1 -->
            <div
              v-for="product in products"
              :key="product.id"
              class="bg-white p-4 rounded-lg shadow">
              <img
                :src="`/src/assets/${product.images[0]}`"
                class="w-full object-cover mb-4 rounded-lg" />
              <a href="#" class="text-lg font-semibold mb-2">{{ product.name }}</a>
              <div class="flex items-center mb-4">
                <span class="text-lg font-bold text-primary">${{ product.cost.toFixed(2) }}</span>
                <span class="text-sm line-through ml-2">$24.99</span>
              </div>
              <button type="button" class="button-primary">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/products';
import { getLookupByKey } from '@/services/lookupsService';

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const { listProducts } = productStore;
const categories = ref();

onMounted(async () => {
  await listProducts();
  categories.value = getLookupByKey('productcategory');
  console.log(categories.value);
});
</script>

<style lang="scss" scoped></style>
