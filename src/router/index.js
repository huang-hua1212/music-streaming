import { createRouter, createWebHashHistory } from 'vue-router';
import CheckoutPayment2 from '@/components/CheckoutPayment2.vue';
import CheckoutPayment1 from '@/components/CheckoutPayment1.vue';
import CheckoutPaymentDesignStep2 from '@/components/CheckoutPaymentDesign_Step2.vue';
import Home from '../views/Home.vue';
import Backend from '../views/Backend.vue';
import FrontendProducts from '../views/Frontend_Products.vue';
import CheckoutPaymentTop from '../views/CheckoutPayment_Top.vue';
import ChartPlaylist from '../views/ChartPlaylist.vue';
import CheckoutPaymentDesign from '../views/CheckoutPayment_Design.vue';

const routes = [
  {
    path: '/backend',
    name: 'BackEndDesign',
    component: () => import('../views/BackEnd_Design.vue'),
  },
  {
    path: '/home',
    name: 'FrontEndDesign1',
    component: () => import('../views/FrontEnd_Design1.vue'),
  },
  {
    path: '/fffff',
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
    path: '/checkout-payment-design',
    name: 'CheckoutPaymentDesign',
    component: CheckoutPaymentDesign,
    children: [
      {
        // when /checkout-payment_top/checkout-payment1 is matched
        path: '', // 這裡空白代表 /checkout-payment_top 顯示的內容就是這個子元件
        name: 'CheckoutPaymentDesignStep2',
        component: CheckoutPaymentDesignStep2,
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
    path: '/',
    name: 'RecordShop',
    component: () => import('../views/RecordShop.vue'),
    children: [
      {
        // when /checkout-payment_top/checkout-payment1 is matched
        path: '', // 這裡空白代表 /checkout-payment_top 顯示的內容就是這個子元件
        name: 'CDs',
        component: () => import('@/components/CDs.vue'),
      },
      {
        // when /checkout-payment_top/checkout-payment2 is matched
        path: 'Vinyls', // 這裡代表 /checkout-payment_top/checkout-payment2 顯示的內容就是這個子元件
        name: 'Vinyls',
        component: () => import('@/components/Vinyls.vue'),
      },
      {
        // when /checkout-payment_top/checkout-payment2 is matched
        path: 'DVDs', // 這裡代表 /checkout-payment_top/checkout-payment2 顯示的內容就是這個子元件
        name: 'DVDs',
        component: () => import('@/components/DVDs.vue'),
      },
      {
        // when /checkout-payment_top/checkout-payment2 is matched
        path: 'Blu-ray_Disc', // 這裡代表 /checkout-payment_top/checkout-payment2 顯示的內容就是這個子元件
        name: 'Blu-ray_Disc',
        component: () => import('@/components/BluRayDisc.vue'),
      },
    ],
  },
  {
    path: '/backend',
    name: 'Backend',
    component: Backend,
  },
  {
    path: '/chartPlaylist/:id',
    name: 'ChartPlaylist',
    component: ChartPlaylist,
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
  // 若使用者輸入的網址為錯誤，或找不到時，有以下兩種解決方法
  // 1.404頁面
  // 2.重新導向
  {
    // 1.404頁面
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
  {
    // 2.重新導向
    path: '/About/:pathMatch(.*)*',
    redirect: {
      name: 'FrontendProducts',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
