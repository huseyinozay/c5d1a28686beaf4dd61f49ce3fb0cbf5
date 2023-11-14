<template>
  <h1>Currency Conversion</h1>

  <div class="grid">
    <div class="col">
      <Calendar
        v-model="startDate"
        :maxDate="maxDateForStartDate"
        :minDate="minDateForStartDate"
        dateFormat="yy-mm-dd"
        showIcon
        showButtonBar
      />
    </div>
    <div class="col">
      <Calendar
        v-model="endDate"
        :maxDate="maxDateForEndDate"
        :minDate="minDateForEndDate"
        dateFormat="yy-mm-dd"
        showIcon
        showButtonBar
      />
    </div>
    <div class="col">
      <Dropdown
        class="w-full md:w-14rem"
        :options="symbols"
        v-model="fromCurrency"
        optionLabel="code"
        filter
      />
    </div>
    <div class="col">
      <MultiSelect
        class="w-full md:w-14rem"
        :options="symbols"
        v-model="toCurrency"
        optionLabel="code"
        filter
      />
    </div>
    <div class="col">
      <Button @click="onClickList" label="List" />
    </div>
  </div>
  <div class="grid">
    <div class="col-6">
      <CustomDataTable
        :data="timeSeriesTableData"
        :columns="currencyTimeSeriesColumns"
      />
    </div>
    <div class="col-6">
      <CustomChart />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from "vue";
import { convertObjectToDropdownData, outputDateFormatted } from "@/utils.js";
import CustomDataTable from "@/components/CustomDataTable.vue";
import CustomChart from "@/components/CustomChart.vue";
import { currencyTimeSeriesColumns } from "@/data/columns";

import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";

const http = inject("http");

onMounted(async () => {
  const symbolReq = await http.get("/exchangerates_data/symbols");
  symbols.value = convertObjectToDropdownData(symbolReq.data.symbols);
});

const startDate = ref();
const endDate = ref();
const symbols = ref();
const fromCurrency = ref({ name: "Turkish Lira", code: "TRY" });
const toCurrency = ref();
const timeSeriesTableData = ref([
  {
    date: "",
    fromCurrency: "",
    toCurrency: "",
    rate: null,
  },
]);

const timeSeriesURl = computed(() => {
  return `/exchangerates_data/timeseries?start_date=${outputDateFormatted(
    startDate.value
  )}&end_date=${outputDateFormatted(endDate.value)}&base=${
    fromCurrency.value.code
  }&symbols=${toCurrency.value.map((currency) => currency.code).join(",")}`;
});

const maxDateForStartDate = computed(() => {
  return endDate.value ? endDate.value : new Date();
});
const minDateForStartDate = computed(() => {
  const date = endDate.value
    ? new Date(
        new Date(endDate.value).setMonth(new Date(endDate.value).getMonth() - 1)
      )
    : null;
  return date;
});
const maxDateForEndDate = computed(() => {
  const date = startDate.value
    ? new Date(
        new Date(startDate.value).setMonth(
          parseInt(new Date(startDate.value).getMonth()) + 1
        )
      )
    : new Date();
  if (date > new Date()) {
    return new Date();
  }
  return date;
});
const minDateForEndDate = computed(() => {
  return startDate.value ? startDate.value : null;
});

const onClickList = async () => {
  const { data } = await http.get(timeSeriesURl.value);
  timeSeriesTableData.value = transformData(data);
  console.log(timeSeriesTableData.value);
};

const transformData = (data) => {
  const result = [];

  const dates = Object.keys(data.rates);

  dates.forEach((date) => {
    const rates = data.rates[date];

    Object.keys(rates).forEach((currency) => {
      const rateEntry = {
        date: date,
        fromCurrency: data.base,
        toCurrency: currency,
        rate: rates[currency],
      };

      result.push(rateEntry);
    });
  });

  return result;
};

//tarihlerle ilgili olan alanların tamamını iki obje(reactive) ve bir watch ile yazdım ancak her değişiklikte 101 kere watchın çalışmasına sebep olduğu için daha kötü dursa da computedlar ile bu kısmı tamamladım.Vaktim olduğunda watchdaki döngü sorununun nasıl çözebileceğimi inceleyeceğim.
</script>
