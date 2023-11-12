import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import PrimeVue from "primevue/config";
import "./style.css";
import App from "./App.vue";
import http from "./plugins/http";

import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);

app.use(http);
app.use(createPinia);
app.use(PrimeVue);
app.use(router);

app.mount("#app");
