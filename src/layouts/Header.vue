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
    label: "Currency conversion",
    icon: "pi pi-fw pi-money-bill",
    route: "/currency-conversion",
  },
  {
    label: "Currency time series",
    icon: "pi pi-fw pi-chart-bar",
    route: "/currency-time-series",
  },
  {
    label: "Currency conversation history",
    icon: "pi pi-fw pi-calendar",
    route: "/currency-conversation-history",
  },
]);
</script>
