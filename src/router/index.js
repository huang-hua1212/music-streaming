import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Backend from '../views/Backend.vue';
import FrontendProducts from '../views/Frontend_Products.vue';
import CheckoutPayment1 from '../views/CheckoutPayment1.vue';
import CheckoutPayment2 from '../views/CheckoutPayment2.vue';

const routes = [
  {
    path: '/frontendproducts',
    name: 'FrontendProducts',
    component: FrontendProducts,
  },
  {
    path: '/',
    name: 'CheckoutPayment1',
    component: CheckoutPayment1,
  },
  {
    path: '/',
    name: 'CheckoutPayment2',
    component: CheckoutPayment2,
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
