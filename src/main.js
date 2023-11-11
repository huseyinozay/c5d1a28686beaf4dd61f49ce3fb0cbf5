import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "./style.css";
import App from "./App.vue";

import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

createApp(App).use(createPinia).use(PrimeVue).mount("#app");
