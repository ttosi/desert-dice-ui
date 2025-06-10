import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useCartStore = defineStore('cart', () => {
  const cart = useStorage('cart', []);

  return {
    cart,
  };
});
