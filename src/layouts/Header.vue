<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="{ item }">
        <router-link :to="item.route" class="p-menuitem-link">
          <i :class="item.icon"></i>
          <span class="p-menuitem-text">{{ item.label }}</span>
        </router-link>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Menubar from "primevue/menubar";

const items = ref([
  {
    label: "Currency Conversion",
    icon: "pi pi-fw pi-money-bill",
    route: "/currency-conversion",
  },
  {
    label: "Currency Time Series",
    icon: "pi pi-fw pi-chart-bar",
    route: "/currency-time-series",
  },
  {
    label: "Currency Conversion History",
    icon: "pi pi-fw pi-calendar",
    route: "/currency-conversion-history",
  },
]);
</script>
