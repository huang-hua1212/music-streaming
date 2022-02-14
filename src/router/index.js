import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Backend from '../views/Backend.vue';
import FrontendProducts from '../views/Frontend_Products.vue';

const routes = [
  {
    path: '/',
    name: 'FrontendProducts',
    component: FrontendProducts,
  },
  {
    path: '/backend',
    name: 'Backend',
    component: Backend,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
