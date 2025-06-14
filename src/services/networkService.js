import { createFetch } from '@vueuse/core';

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useSecureFetch = createFetch({
  options: {
    async beforeFetch({ options }) {
      options.headers.Authorization = `Bearer ${API_TOKEN}`;
      options.headers['Content-Type'] = 'application/json';
      options.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH';
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
  async post(endpoint, data) {
    await useSecureFetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async patch(endpoint, data) {
    console.log(endpoint, data);
    await useSecureFetch(`${baseUrl}/${endpoint}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

// const post = async () => {};

export { network };
