import {
  createRouter,
  createWebHashHistory,
} from 'vue-router';
import CheckoutPayment2 from '@/components/CheckoutPayment2.vue';
import CheckoutPayment1 from '@/components/CheckoutPayment1.vue';
import Home from '../views/Home.vue';
import Backend from '../views/Backend.vue';
import FrontendProducts from '../views/Frontend_Products.vue';
import CheckoutPaymentTop from '../views/CheckoutPayment_Top.vue';

const routes = [
  {
    path: '/',
    name: 'FrontendProducts',
    component: FrontendProducts,
  },
  {
    path: '/checkout-payment-top',
    name: 'CheckoutPaymentTop',
    component: CheckoutPaymentTop,
    children: [
      {
        // when /checkout-payment_top/checkout-payment1 is matched
        path: '', // 這裡空白代表 /checkout-payment_top 顯示的內容就是這個子元件
        name: 'CheckoutPayment1',
        component: CheckoutPayment1,
      },
      {
        // when /checkout-payment_top/checkout-payment2 is matched
        path: 'checkout-payment2', // 這裡代表 /checkout-payment_top/checkout-payment2 顯示的內容就是這個子元件
        name: 'CheckoutPayment2',
        component: CheckoutPayment2,
      },
    ],
  },
  {
    path: '/backend',
    name: 'Backend',
    component: Backend,
  },
  {
    path: '/home',
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
