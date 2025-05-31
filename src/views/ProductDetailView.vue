<template>
  <section id="product-info">
    <div v-if="product" class="container mx-auto mt-3">
      <div class="py-6">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="w-full lg:w-1/2">
            <div class="grid gap-4">
              <div id="main-image-container">
                <img
                  ref="mainImage"
                  class="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                  :src="`${imageBaseUrl}/${product?.images[0]}`"
                  alt="Main Product Image" />
              </div>
              <div class="grid grid-cols-5 gap-4">
                <div v-for="thumb in product.thumbnails" :key="thumb" @click="changeImage(thumb)">
                  <img :src="`${imageBaseUrl}/${thumb}`" class="thumbnail" />
                </div>
              </div>
            </div>
          </div>
          <!-- * Product Details -->
          <div class="w-full lg:w-1/2 flex flex-col justify-between">
            <div class="pb-8">
              <h1 class="font-[Cinzel] text-desert-dark text-3xl font-bold mb-4">
                {{ product?.name }}
              </h1>
              <div class="mb-6">
                <p>
                  {{ product?.description }}
                </p>
              </div>
              <div class="text-2xl font-semibold mb-5">${{ product?.price.toFixed(2) }}</div>
              <form class="max-w-sm">
                <label for="countries" class="block mb-1 text-sm font-bold">Options</label>
                <select v-bind="selectedOption" id="countries" class="">
                  <option v-for="option in product.options" :key="option.id">
                    {{ option.description }}
                  </option>
                </select>
                <button class="button-primary mt-9">Add to Cart</button>
              </form>
            </div>
            <!-- Social sharing -->
            <div class="flex space-x-4 my-6"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';

const route = useRoute();
const imageBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;
const mainImage = ref();
const selectedOption = ref();

const productStore = useProductStore();
const { product } = storeToRefs(productStore);
const { getProduct } = productStore;

const changeImage = (thumbnail) => {
  mainImage.value.src = `${imageBaseUrl}/${thumbnail.replace('-thumbnail', '')}`;
};

watchEffect(async () => {
  await getProduct(route.params.id);
});

// onMounted(async () => {
//   console.log(route.params.id);
//   await getProduct(route.params.id);
// });
</script>

<style scoped>
.active-thumbnail {
  selected: 2px solid red;
}
</style>
