<template>
  <h1>Currency Conversion History</h1>
  <div class="card px-8">
    <CustomDataTable :data="data" :columns="currencyConversionHistoryColumns" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import CustomDataTable from "@/components/CustomDataTable.vue";
import { currencyConversionHistoryColumns } from "@/data/columns";
import { useCurrencyStore } from "@/stores/currencyStore.js";

const store = useCurrencyStore();

const data = computed(() => store.currencyHistory);
</script>
