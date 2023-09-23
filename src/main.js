import { createApp } from "vue";
import App from "./App.vue";
import router from "../router";
import { ClientService } from "@/common/services/clientService";
const app = createApp(App);
const clientService = new ClientService();
app.provide("clientService", clientService);
app.use(router);
app.mount("#app");
//# sourceMappingURL=main.js.map
