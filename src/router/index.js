import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/DefaultLayout.vue"),
    children: [
      {
        path: "currency-conversion",
        name: "CurrencyConversion",
        component: () => import("../views/currencyConversion/Index.vue"),
      },
      {
        path: "currency-time-series",
        name: "CurrencyTimeSeries",
        component: () => import("../views/currencyTimeSeries/Index.vue"),
      },
      {
        path: "currency-conversion-history",
        name: "CurrencyConversionHistory",
        component: () => import("../views/currencyConversionHistory/Index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
