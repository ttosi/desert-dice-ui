import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { initFlowbite } from 'flowbite';
import mdiVue from 'mdi-vue/v3';
import * as mdijs from '@mdi/js';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(initFlowbite);
app.use(mdiVue, {
  icons: mdijs,
});

app.mount('#app');
