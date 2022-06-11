import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';

import { ptBR } from '@/localization';

import store from './store';
import CustomComponents from '@/common/components';

const Application = createApp(App).use(store).use(router).use(PrimeVue, { locale: ptBR }).use(CustomComponents).mount('#app');

export default Application;
