import { createFetch } from '@vueuse/core';

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useSecureFetch = createFetch({
  options: {
    async beforeFetch({ options }) {
      options.headers.Authorization = `Bearer ${API_TOKEN}`;
      options.headers['Content-Type'] = 'application/json';
      options.headers['Access-Control-Allow-Methods'] = 'GET, POST';
      return { options };
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
});

const network = {
  async get(endpoint) {
    const { data } = await useSecureFetch(`${baseUrl}/${endpoint}`);
    return JSON.parse(data.value);
  },
};

// const post = async () => {};

export { network };
