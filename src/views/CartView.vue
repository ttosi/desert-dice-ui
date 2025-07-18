<template>
  <section>
    <div class="container mx-auto px-3 mt-5 flex-col md:flex w-full">
      <h1 class="font-[Cinzel] text-desert-dark text-3xl font-bold mb-4">Get Ready to Roll!</h1>
      <div class="md:flex gap-4">
        <div class="w-full md:max-w-3/5 mb-4">
          <div
            v-for="item in cart"
            :key="item.product.id"
            class="shadow shadow-slate-400 flex rounded-lg p-2 gap-3 mb-2">
            <img
              class="max-h-28 rounded-lg"
              :src="`${imageBaseUrl}/${item.product.thumbnails[0]}`" />
            <div class="w-full flex-col text-md">
              <div class="flex justify-between">
                <div class="flex justify-start items-center">
                  <div class="font-bold text-lg">{{ item.product.name }}</div>
                  <div v-if="environment !== 'prod'" class="ml-2 text-slate-600 text-sm">
                    (pid: {{ item.product.id }}, oid: {{ item.option.id }} )
                  </div>
                </div>
                <Icon
                  icon="mdi:trash-can"
                  height="22"
                  class="text-slate-500 mr-2 mt-2 cursor-pointer"
                  @click="remove(item.product.id, item.option.id)" />
              </div>
              <div>{{ item.option.name }}</div>
              <div class="font-bold mt-2.5">${{ item.option.price.toFixed(2) }}</div>
              <div>
                Quantity: 1 {{ item.isUnique }}
                <span v-if="item.isUnique" class="italic">(unique item)</span>
              </div>
              <!-- <div class="max-w-[8rem]">
                <label for="quantity-input" class="block text-sm font-medium">
                  Choose quantity:
                </label>
                <div class="relative flex items-center">
                  <button
                    type="button"
                    @click="quantityDecrease"
                    class="border border-desert-light bg-desert-dark text-desert-light rounded-s-lg px-3 h-11 cursor-pointer">
                  </button>
                  <input
                    type="text"
                    class="bg-desert-dark border border-desert-light text-slate-300 text-center text-sm block w-full px-6 h-11 py-2.5"
                    placeholder="1" />
                  <button
                    type="button"
                    @click="quantityIncrease"
                    class="border border-desert-light bg-desert-dark text-desert-light rounded-e-lg px-3 h-11 focus:outline-none cursor-pointer">
                  </button>
                </div>
              </div> -->
            </div>
          </div>
          <div class="italic text-justify text-sm">
            Unique items will be removed from your cart after 2 hours
          </div>
        </div>
        <div class="flex-col h-full w-full md:max-w-2/5 shadow shadow-slate-500 rounded-md mb-4">
          <div
            class="flex justify-center font-bold font-xl bg-desert-dark text-desert-light rounded-t-md p-3">
            Order Summary
          </div>
          <div class="p-3">
            <div class="flex justify-between mb-4">
              <div>Subtotal</div>
              <div>${{ subtotal?.toFixed(2) }}</div>
            </div>
            <div class="flex justify-between mb-4">
              <div>Shipping (flat rate)</div>
              <div>$7.50</div>
            </div>
            <div class="flex justify-between mb-6 font-bold">
              <div>Total</div>
              <div>${{ total.toFixed(2) }}</div>
            </div>
            <div class="flex justify-center w-full mt-14">
              <RouterLink to="/checkout" class="w-full">
                <button class="button-primary w-full">Checkout</button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import { useProductStore } from '@/stores/productStore';

import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const environment = import.meta.env.VITE_ENVIRONMENT;
console.log('-------', environment);
const imageBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;
const shippingCost = import.meta.env.VITE_FLAT_RATE_SHIPPING_COST;

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const { updateProduct } = useProductStore();

const subtotal = computed(() => {
  return cart.value.reduce((acc, o) => acc + o.option.price, 0);
});

const total = computed(() => {
  return subtotal.value + shippingCost / 100;
});

const remove = (productId) => {
  cart.value = cart.value.filter((p) => p.product.id !== productId);

  updateProduct(productId, {
    reservedAt: null,
  });
};
</script>

<style scoped></style>
