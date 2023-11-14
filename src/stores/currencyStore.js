import { ref } from "vue";
import { defineStore } from "pinia";

export const useCurrencyStore = defineStore("currencyStore", () => {
  const currencyHistory = ref([]);

  const setCurrencyHistory = (history) => {
    currencyHistory.value.push(transformData(history));
  };

  const transformData = (data) => {
    const result = {
      timestamp: data.info.timestamp,
      date: data.date,
      fromCurrency: data.query.from,
      toCurrency: data.query.to,
      amount: data.query.amount,
      rate: data.info.rate,
    };

    return result;
  };

  return {
    currencyHistory,
    setCurrencyHistory,
  };
});
