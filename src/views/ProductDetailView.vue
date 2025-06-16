<template>
  <section class="mx-4">
    <div v-if="product" class="container mx-auto">
      <div class="py-6">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="">
            <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
              <Slide v-for="(image, index) in product.images" :key="index">
                <img :src="`${imageBaseUrl}/${image}`" class="gallery-image" />
              </Slide>
            </Carousel>
            <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
              <Slide v-for="(image, index) in product.images" :key="index">
                <template #default="{ currentIndex, isActive }">
                  <div
                    :class="['thumbnail', { 'is-active': isActive }]"
                    @click="slideTo(currentIndex)">
                    <img :src="`${imageBaseUrl}/${image}`" class="thumbnail-image" />
                  </div>
                </template>
              </Slide>
              <template #addons>
                <Navigation />
              </template>
            </Carousel>
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
import router from '@/router';
import { useRoute } from 'vue-router';
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

import { useProductStore } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';
import { useModal } from '@/composables/useModal';
import BaseModal from '@/components/BaseModal.vue';

const imageBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;
const selectedOption = ref();
const currentSlide = ref(0);

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const { product, invalidateCache } = storeToRefs(productStore);
const { getProduct, updateProduct } = productStore;
const { cart } = storeToRefs(cartStore);
const { isOpen, open, close } = useModal();

const slideTo = (nextSlide) => (currentSlide.value = nextSlide);

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: false,
  slideEffect: 'fade',
  mouseDrag: false,
  touchDrag: false,
};

const thumbnailsConfig = {
  height: 120,
  itemsToShow: 3,
  wrapAround: false,
  touchDrag: true,
  gap: 10,
};

const addToCart = async () => {
  open();

  cart.value.push({
    product: product.value,
    option: selectedOption.value,
  });

  invalidateCache.value = true;

  // reserve product - in cart, not sold
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
});
</script>

<style scoped>
.option-sold {
  color: #aaa;
  font-style: italic;
}

:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-image {
  border-radius: 16px;
}

#thumbnails {
  margin-top: 10px;
}

.thumbnail {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.thumbnail.is-active,
.thumbnail:hover {
  opacity: 1;
}
</style>
