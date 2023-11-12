import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "CurrencyConversion",
    component: () => import("../views/currencyConversion/Index.vue"),
  },
  {
    path: "/currencyTimeSeries",
    name: "CurrencyTimeSeries",
    component: () => import("../views/currencyTimeSeries/Index.vue"),
  },
  {
    path: "/currencyConversationHistory",
    name: "CurrencyConversationHistory",
    component: () => import("../views/currencyConversationHistory/Index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
