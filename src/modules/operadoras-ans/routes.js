
export default [
  {
    path: '/',
    name: 'operadora-ans.list',
    component: () => import(/* webpackChunkName: "operadora-ans-list" */ './views/OperadoraAnsList.vue')
  },
  {
    path: '/adicionar',
    name: 'operadora-ans.create',
    component: () => import(/* webpackChunkName: "operadora-ans-form" */ './views/OperadoraAnsForm.vue'),
    meta: {
      state: 'CREATE'
    }
  },
  {
    path: '/:id/editar',
    name: 'operadora-ans.edit',
    component: () => import(/* webpackChunkName: "operadora-ans-form" */ './views/OperadoraAnsForm.vue'),
    meta: {
      state: 'UPDATE'
    }
  }

];
