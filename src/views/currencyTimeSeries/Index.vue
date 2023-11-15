<template>
  <h1>Currency Time Series</h1>

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
      <Chart type="line" :data="timeSeriesChartData" class="h-30rem" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from "vue";
import { convertObjectToDropdownData, outputDateFormatted } from "@/utils.js";
import CustomDataTable from "@/components/CustomDataTable.vue";
import { currencyTimeSeriesColumns } from "@/data/columns";

import { useToast } from "vue-toastification";

import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import Chart from "primevue/chart";

const http = inject("http");
const toast = useToast();

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
const timeSeriesChartData = ref({
  labels: [],
  datasets: [],
});

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
  if (startDate.value && endDate.value) {
    const { data } = await http.get(timeSeriesURl.value);
    timeSeriesTableData.value = convertTableData(data);
    timeSeriesChartData.value = convertToChartData(data);
    console.log(timeSeriesChartData.value);
  } else {
    toast.error("Please select start and end date");
  }
};

const convertTableData = (data) => {
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

const convertToChartData = (apiResponse) => {
  const labels = Object.keys(apiResponse.rates).map((date) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}`;
  });

  const datasets = Object.keys(
    apiResponse.rates[Object.keys(apiResponse.rates)[0]]
  ).map((currency) => {
    return {
      label: currency,
      data: Object.values(apiResponse.rates).map((date) => date[currency]),
    };
  });

  return {
    labels: labels,
    datasets: datasets,
  };
};

//tarihlerle ilgili olan alanların tamamını iki obje(reactive) ve bir watch ile yazdım ancak her değişiklikte 101 kere watchın
//çalışmasına sebep olduğu için daha kötü dursa da computedlar ile bu kısmı tamamladım.Vaktim olduğunda watchdaki döngü sorununun nasıl çözebileceğimi inceleyeceğim.
</script>
