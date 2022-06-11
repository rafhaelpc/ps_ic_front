
export default [
  {
    path: '/',
    name: 'operadora-ans.list',
    component: () => import(/* webpackChunkName: "about" */ './views/OperadoraAnsList.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];
