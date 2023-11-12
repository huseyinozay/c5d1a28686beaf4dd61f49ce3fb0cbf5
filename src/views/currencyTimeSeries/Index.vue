<template>
  <p>Currency conversion</p>

  <div class="grid">
    <div class="col">
      <Calendar v-model="startDate" showIcon />
    </div>
    <div class="col">
      <Calendar v-model="endDate" showIcon />
    </div>
    <div class="col">
      <Dropdown class="w-full" />
    </div>
    <div class="col">
      <Dropdown class="w-full" />
    </div>
    <div class="col">
      <Button @click="() => console.log(startDate)" label="List" />
    </div>
  </div>
  <div class="grid">
    <div class="col-6">
      <CustomDataTable :data="data" :columns="currencyTimeSeriesColumns" />
    </div>
    <div class="col-6">
      <CustomChart />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import CustomDataTable from "../../components/CustomDataTable.vue";
import CustomChart from "../../components/CustomChart.vue";
import { currencyTimeSeriesColumns } from "../../data/columns";

const startDate = ref();
const endDate = ref();
</script>
