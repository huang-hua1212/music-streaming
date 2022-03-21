import { createRouter, createWebHashHistory } from 'vue-router';
// import CheckoutPayment2 from '@/components/CheckoutPayment2.vue';
// import CheckoutPayment1 from '@/components/CheckoutPayment1.vue';
import CheckoutPaymentDesignStep2 from '@/components/CheckoutPaymentDesign_Step2.vue';
import Backend from '../views/Backend.vue';
import FrontendProducts from '../views/Frontend_Products.vue';
// import CheckoutPaymentTop from '../views/CheckoutPayment_Top.vue';
import ChartPlaylist from '../views/ChartPlaylist.vue';
import CheckoutPaymentDesign from '../views/CheckoutPayment_Design.vue';

const routes = [
  {
    path: '/backend',
    name: 'BackEndDesign',
    component: () => import('../views/BackEnd_Design.vue'),
  },
  {
    path: '/',
    name: 'FrontEndDesign1',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/fffff',
    name: 'FrontendProducts',
    component: FrontendProducts,
  },
  // {
  //   path: '/checkout-payment-top',
  //   name: 'CheckoutPaymentTop',
  //   component: CheckoutPaymentTop,
  //   children: [
  //     {
  //       // when /checkout-payment_top/checkout-payment1 is matched
  //       path: '', // 這裡空白代表 /checkout-payment_top 顯示的內容就是這個子元件
  //       name: 'CheckoutPayment1',
  //       component: CheckoutPayment1,
  //     },
  //     {
  //       // when /checkout-payment_top/checkout-payment2 is matched
  //       path: 'checkout-payment2', // 這裡代表 /checkout-payment_top/checkout-payment2 顯示的內容就是這個子元件
  //       name: 'CheckoutPayment2',
  //       component: CheckoutPayment2,
  //     },
  //   ],
  // },
  {
    path: '/checkout-payment-design',
    name: 'CheckoutPaymentDesign',
    component: CheckoutPaymentDesign,
    children: [
      {
        path: 'checkout-payment-designstep2',
        name: 'CheckoutPaymentDesignStep2',
        component: CheckoutPaymentDesignStep2,
      },
      {
        path: 'checkout-payment-designstep1',
        name: 'CheckoutPaymentDesignStep1',
        component: () => import('../components/CheckoutPaymentDesign_Step1.vue'),
      },
      {
        path: 'checkout-payment-designstep3',
        name: 'CheckoutPaymentDesignStep3',
        component: () => import('../components/CheckoutPaymentDesign_Step3.vue'),
      },
      {
        path: 'checkout-payment-designstep4',
        name: 'CheckoutPaymentDesignStep4',
        component: () => import('../components/CheckoutPaymentDesign_Step4.vue'),
      },
    ],
  },
  {
    path: '/record-shop-main',
    name: 'RecordShopMain',
    component: () => import('../views/RecordShopMain.vue'),
  },
  {
    path: '/record-shop',
    name: 'RecordShop',
    component: () => import('../views/RecordShop.vue'),
    children: [
      {
        path: 'cds',
        name: 'CDs',
        component: () => import('@/components/CDs.vue'),
      },
      {
        path: 'vinyls',
        name: 'Vinyls',
        component: () => import('@/components/Vinyls.vue'),
      },
      {
        path: 'dvds',
        name: 'DVDs',
        component: () => import('@/components/DVDs.vue'),
      },
      {
        path: 'blu-ray_disc',
        name: 'Blu-ray_Disc',
        component: () => import('@/components/BluRayDisc.vue'),
      },
    ],
  },
  {
    path: '/backend_origin',
    name: 'Backend',
    component: Backend,
  },
  {
    path: '/chartPlaylist/:id',
    name: 'ChartPlaylist',
    component: ChartPlaylist,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  // 若使用者輸入的網址為錯誤，或找不到時，有以下兩種解決方法
  // 1.404頁面
  // 2.重新導向
  // {
  //   path: '/',
  //   name: 'Test',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue'),
  // },
  {
    // 1.404頁面
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
  // {
  //   // 2.重新導向
  //   path: '/About/:pathMatch(.*)*',
  //   redirect: {
  //     name: 'FrontendProducts',
  //   },
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
