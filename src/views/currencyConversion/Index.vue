<template>
  <h1>Currency Conversion</h1>

  <div class="grid">
    <div class="col">
      <Calendar
        v-model="date"
        dateFormat="yy-mm-dd"
        showIcon
        :maxDate="maxDate"
      />
    </div>
  </div>
  <div class="grid">
    <div class="col-3 col-offset-3">
      <InputNumber v-model="fromAmount" />
      <br />
      <span>press enter to update the value</span>
    </div>
    <div class="col-3">
      <Dropdown
        class="w-full md:w-14rem"
        :options="symbols"
        v-model="fromCurrency"
        optionLabel="code"
        filter
      />
    </div>
  </div>
  <div class="grid">
    <div class="col-3 col-offset-3">
      <InputNumber v-model="toAmount" readonly />
    </div>
    <div class="col-3">
      <Dropdown
        class="w-full md:w-14rem"
        :options="symbols"
        v-model="toCurrency"
        optionLabel="code"
        filter
      />
    </div>
  </div>

  <div class="grid mt-5">
    <div class="col">
      <h4>{{ fromAmount }} {{ fromCurrency.name }} equals</h4>
      <h1>{{ toAmount }} {{ toCurrency.name }}</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, inject, onMounted } from "vue";
import { convertObjectToDropdownData, outputDateFormatted } from "@/utils.js";
import { useCurrencyStore } from "@/stores/currencyStore.js";

import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";

const http = inject("http");
const store = useCurrencyStore();

onMounted(async () => {
  const symbolReq = await http.get("/exchangerates_data/symbols");
  symbols.value = convertObjectToDropdownData(symbolReq.data.symbols);
  const currencyReq = await http.get(convertUrl.value);
  toAmount.value = currencyReq.data.result;
  store.setCurrencyHistory(currencyReq.data);
});

const date = ref();
const maxDate = ref(new Date());
const symbols = ref();
const fromCurrency = ref({ name: "Turkish Lira", code: "TRY" });
const toCurrency = ref({ name: "United States Dollar", code: "USD" });
const fromAmount = ref(1);
const toAmount = ref();

const convertUrl = computed(() => {
  return `/exchangerates_data/convert?to=${toCurrency.value.code}&from=${
    fromCurrency.value.code
  }&amount=${fromAmount.value}&date=${outputDateFormatted(date.value)}`;
});

watch(convertUrl, async (url) => {
  if (fromAmount.value !== "") {
    const { data } = await http.get(url);
    toAmount.value = data.result;
    store.setCurrencyHistory(data);
  }
});
</script>
