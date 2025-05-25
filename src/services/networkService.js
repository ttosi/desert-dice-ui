import { useFetch, createFetch } from '@vueuse/core';

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const headers = {
  'Content-Type': 'application/json',
  Authorization: API_TOKEN,
};

const useMyFetch = createFetch({
  baseUrl: 'https://my-api.com',
  options: {
    async beforeFetch({ options }) {
      options.headers.Authorization = `Bearer ${API_TOKEN}`;
      // options.headers.Authorization = `Bearer whatthefuck`;
      options.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
      options.headers['Content-Type'] = 'application/json';
      console.log('here we gopppoo', options);
      return { options };
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
});

const get = async (endpoint) => {
  console.log('fetching');
  const { data } = await useMyFetch(`${baseUrl}/${endpoint}`);
  console.log(data.value);
};

const post = async () => {};

export { get };
