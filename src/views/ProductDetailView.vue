<template>
  <section class="mx-4">
    <div v-if="product" class="container mx-auto">
      <div class="py-6">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="">
            <div class="grid gap-4">
              <div
                id="main-image-container"
                class="max-w-[500px] rounded-lg shadow shadow-slate-400">
                <img
                  ref="mainImage"
                  class="h-auto w-full max-w-[500px] rounded-lg object-cover object-center md:h-[480px]"
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
          <div class="w-full lg:w-full flex flex-col justify-between">
            <div class="pb-8">
              <h1 class="font-[Cinzel] text-desert-dark text-3xl font-bold mb-4">
                {{ product.name }}
              </h1>
              <div v-html="product.description" class="mb-6 text-lg"></div>
              <div class="text-desert-dark font-[Cinzel] text-2xl font-bold mb-5">
                ${{ selectedOption?.price?.toFixed(2) }}
              </div>
              <div class="max-w-sm">
                <div v-if="product.options.length > 1">
                  <label class="block mb-1 text-sm font-bold">Options</label>
                  <select v-model="selectedOption">
                    <option
                      v-for="option in product.options"
                      :key="option.id"
                      :value="option"
                      class="mr-5">
                      {{ option.name }} - ${{ option.price.toFixed(2) }}
                    </option>
                  </select>
                </div>
                <div class="mb-6 mt-1 italic">
                  <div v-if="selectedOption?.notes">
                    {{ selectedOption.notes }}
                  </div>
                </div>
                <button class="button-primary" @click="addToCart">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button>Open Modal</button>
    <BaseModal
      :show="isOpen"
      title="Item has been added to your cart!"
      @close="close"
      @confirm="handleConfirm">
      <div class="flex gap-3">
        <button class="button-primary" @click="router.push('/products/dice')">
          Continue Shopping
        </button>
        <button class="button-primary" @click="router.push('/cart')">Go To Cart</button>
      </div>
    </BaseModal>
  </section>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';
import { useModal } from '@/composables/useModal';
import router from '@/router';
import BaseModal from '@/components/BaseModal.vue';

const route = useRoute();
const imageBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;
const mainImage = ref(null);
const currentImage = ref(null);
const selectedOption = ref();

const productStore = useProductStore();
const { product, invalidateCache } = storeToRefs(productStore);
const { getProduct, updateProduct } = productStore;

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

const { isOpen, open, close } = useModal();

const changeImage = (thumbnail) => {
  const fullImage = thumbnail.replace('-thumbnail', '');
  mainImage.value.src = `${imageBaseUrl}/${fullImage}`;
  currentImage.value = fullImage;
};

const addToCart = async () => {
  open();

  cart.value.push({
    product: product.value,
    option: selectedOption.value,
  });

  invalidateCache.value = true;

  // reserve this product - in a cart but not sold
  await updateProduct(product.value.id, {
    reservedAt: new Date().toISOString(),
  });
};

const handleConfirm = () => {
  console.log('handle confirm');
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
