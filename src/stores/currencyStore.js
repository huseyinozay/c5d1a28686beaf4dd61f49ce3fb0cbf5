import { defineStore } from "pinia";

export const useCurrencyStore = defineStore("currencyStore", {
  state: () => {
    return {
      symbols: [],
    };
  },
  getters: {},
  actions: {},
});
