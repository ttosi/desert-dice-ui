import { ref } from 'vue';
import { defineStore } from 'pinia';
import { network } from '@/services/networkService';

export const useProductStore = defineStore('product', () => {
  const products = ref([]);
  const product = ref();
  const cachedProducts = ref(new Map());
  const categories = ref([]);
  const tags = ref([]);
  const invalidateCache = ref(false);

  const getProduct = async (id) => {
    product.value = await network.get(`products/${id}`);
  };

  const getProductsByCategory = async (category) => {
    if (cachedProducts.value.has(category) && !invalidateCache.value) {
      products.value = cachedProducts.value.get(category);
      return;
    }

    const data = await network.get(`products/category/${category}`);

    cachedProducts.value.set(category, data);
    products.value = data;
    invalidateCache.value = false;
  };

  const getProductCategories = async () => {
    categories.value = await network.get('products/categories');
  };

  const getProductTags = async (category) => {
    tags.value = await network.get(`products/category/${category}/tags`);
  };

  // TODO - make secure
  const updateProduct = async (id, data) => {
    await network.patch(`products/${id}`, data);
  };

  return {
    products,
    product,
    categories,
    tags,
    getProduct,
    updateProduct,
    getProductsByCategory,
    getProductCategories,
    getProductTags,
    invalidateCache,
  };
});
