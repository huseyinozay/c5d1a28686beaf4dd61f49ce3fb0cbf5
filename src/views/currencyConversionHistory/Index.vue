<template>
  <div class="card">
    <CustomDataTable :data="data" :columns="currencyConversionHistoryColumns" />
  </div>
</template>

<script setup>
import CustomDataTable from "@/components/CustomDataTable.vue";
import { currencyConversionHistoryColumns } from "@/data/columns";
</script>
