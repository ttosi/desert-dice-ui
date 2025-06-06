import 'vuetify/styles';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { vuetify } from './plugins/vuetify';
import mdiVue from 'mdi-vue/v3';
import * as mdijs from '@mdi/js';

const app = createApp(App);

console.log('mode', import.meta.env.VITE_API_BASE_URL);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(mdiVue, {
  icons: mdijs,
});

app.mount('#app');
