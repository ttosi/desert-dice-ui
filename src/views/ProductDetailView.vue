<template>
  <section id="product-info">
    <div v-if="product" class="container mx-auto mt-3">
      <div class="py-6">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="w-full lg:w-2/5">
            <div class="grid gap-4">
              <div id="main-image-container" class="rounded-xl shadow shadow-slate-400">
                <img
                  ref="mainImage"
                  class="h-auto w-full max-w-[500px] rounded-xl object-cover object-center md:h-[480px]"
                  style="padding: 5px"
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
          <div class="w-full lg:w-3/5 flex flex-col justify-between">
            <div class="pb-8">
              <h1 class="font-[Cinzel] text-desert-dark text-3xl font-bold mb-4">
                {{ product.name }}
              </h1>
              <div v-html="product.description" class="mb-6 text-lg"></div>
              <div class="text-desert-dark font-[Cinzel] text-2xl font-bold mb-5">
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
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" location="top right" color="desert-dark">
        <template v-slot:actions>
          <div class="text-desert-light flex justify-center font-bold ml-3 mr-3">
            <mdicon class="text-cactus-medium mr-2" name="check-decagram" />
            {{ product.name }} Added To Cart!
          </div>
          <v-btn class="bg-desert-light" color="desert-dark" variant="tonal" to="/cart">
            Go To Cart
          </v-btn>
        </template>
      </v-snackbar>
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
const snackbar = ref(false);

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
  const options = product.value.options?.filter((o) => !(chonkSold && o.hasChonk));
  return options;
});

const isSold = (option) => {
  const chonkSold = product.value.options.some((o) => o.hasChonk && o.isSold);
  return chonkSold && option.hasChonk;
};

const addToCart = () => {
  snackbar.value = true;
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
