import { createRouter, createWebHashHistory } from 'vue-router';

import operadorasAns from '@/modules/operadoras-ans/routes';

const routes = [
  ...operadorasAns
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
