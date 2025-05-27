import { ref } from 'vue';
import { defineStore } from 'pinia';
import { network } from '@/services/networkService';

export const useProductStore = defineStore('product', () => {
  const products = ref([]);
  const product = ref();

  const listProducts = async () => {
    products.value = await network.get('products');
  };

  return { products, product, listProducts };
});
