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
                  class="h-auto w-full max-w-xl rounded-lg object-cover object-center md:h-[480px]"
                  :src="`${imageBaseUrl}/${product?.images[0]}`"
                  alt="Main Product Image" />
              </div>
              <div class="grid grid-cols-5 gap-4">
                <div
                  v-for="thumbnail in product.thumbnails
                    .slice()
                    .sort((a, b) => a.sequence - b.sequence)"
                  :key="thumbnail"
                  @click="changeImage(thumbnail)"
                  :class="{
                    'thumbnail-active': currentImage === thumbnail.replace('-thumbnail', ''),
                  }">
                  <img :src="`${imageBaseUrl}/${thumbnail}`" class="thumbnail" />
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex flex-col justify-between">
            <div class="pb-8">
              <h1 class="font-[Cinzel] text-desert-dark text-3xl font-bold mb-4">
                {{ product.name }}
              </h1>
              <div v-html="product.description" class="mb-6 text-lg"></div>
              <div class="text-2xl font-semibold mb-5">
                ${{ selectedOption?.price?.toFixed(2) }}
              </div>
              <form class="max-w-sm">
                <div v-if="product.options.length > 1">
                  <label class="block mb-1 text-sm font-bold">Options</label>
                  <select v-model="selectedOption">
                    <option
                      v-for="option in availableOptions"
                      :key="option.id"
                      :value="option"
                      :disabled="isSold(option)"
                      :class="{ 'option-sold': isSold(option) }"
                      class="mr-5">
                      <span v-if="isSold(option)">SOLD</span>
                      {{ option.name }} - ${{ option.price.toFixed(2) }}
                    </option>
                  </select>
                </div>
                <div class="mb-6 mt-1 italic">
                  <div v-if="selectedOption.notes">
                    {{ selectedOption.notes }}
                  </div>
                </div>
                <RouterLink to="" class="button-primary mt-9" @click="addToCart">
                  Add to Cart
                </RouterLink>
              </form>
            </div>
            <div class="flex space-x-4 my-6"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- drawer init and toggle -->
    <div class="text-center">
      <button
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button"
        data-drawer-target="drawer-right-example"
        data-drawer-show="drawer-right-example"
        data-drawer-placement="right"
        aria-controls="drawer-right-example">
        Show right drawer
      </button>
    </div>

    <!-- drawer component -->
    <div
      id="drawer-right-example"
      class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
      tabindex="-1"
      aria-labelledby="drawer-right-label">
      <h5
        id="drawer-right-label"
        class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
        <svg
          class="w-4 h-4 me-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        Right drawer
      </h5>
      <button
        type="button"
        data-drawer-hide="drawer-right-example"
        aria-controls="drawer-right-example"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Supercharge your hiring by taking advantage of our
        <a
          href="#"
          class="text-blue-600 underline font-medium dark:text-blue-500 hover:no-underline">
          limited-time sale
        </a>
        for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the
        #1 design job board.
      </p>
      <div class="grid grid-cols-2 gap-4">
        <a
          href="#"
          class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Learn more
        </a>
        <a
          href="#"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Get access
          <svg
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';

const route = useRoute();
const imageBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;
const mainImage = ref(null);
const currentImage = ref(null);
const selectedOption = ref('');

const productStore = useProductStore();
const { product } = storeToRefs(productStore);
const { getProduct } = productStore;

const changeImage = (thumbnail) => {
  const fullImage = thumbnail.replace('-thumbnail', '');
  mainImage.value.src = `${imageBaseUrl}/${fullImage}`;
  currentImage.value = fullImage;
};

const availableOptions = computed(() => {
  const chonkSold = product.value.options.some((o) => o.hasChonk && o.isSold);
  // // console.log(chonkSold);
  // const optionText =
  //   chonkSold && option.hasChonk
  //     ? `SOLD ${option.name} - $${option.price.toFixed(2)}`
  //     : `${option.name} - $${option.price.toFixed(2)}`;
  // console.log(optionText);
  // console.log(product.value);
  const options = product.value.options?.filter((o) => !(chonkSold && o.hasChonk));
  return options;
});

const isSold = (option) => {
  const chonkSold = product.value.options.some((o) => o.hasChonk && o.isSold);
  console.log(chonkSold && option.hasChonk);
  return chonkSold && option.hasChonk;
};

const addToCart = () => {
  console.log(selectedOption.value);
};

watchEffect(async () => {
  product.value = null;
  await getProduct(route.params.id);
  selectedOption.value = product.value.options[0];
  currentImage.value = product.value.images[0];
});
</script>

<style scoped>
.option-sold {
  color: #aaa;
  font-style: italic;
}
</style>
