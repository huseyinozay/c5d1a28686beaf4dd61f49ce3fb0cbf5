<template>
  <p>Currency conversion</p>

  <div class="grid">
    <div class="col">
      <Calendar v-model="date" showIcon />
    </div>
  </div>
  <div class="grid">
    <div class="col-3 col-offset-3">
      <InputText />
    </div>
    <div class="col-3">
      <Dropdown class="w-full md:w-14rem" />
    </div>
  </div>
  <div class="grid">
    <div class="col-3 col-offset-3">
      <InputText />
    </div>
    <div class="col-3">
      <Dropdown class="w-full md:w-14rem" />
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";

import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";

const http = inject("http");

// onMounted(async () => {
//   const { data } = await http.get("/exchangerates_data/symbols");
//   console.log(data);
// });

const date = ref();
</script>
