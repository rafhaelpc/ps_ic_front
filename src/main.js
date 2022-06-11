import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';

createApp(App).use(router).use(PrimeVue).directive('tooltip', Tooltip).mount('#app');
