import { createApp } from "vue";
import App from "./App.vue";
import { ClientService } from "@/common/services/clientService";
import { IClientService } from "@/common/services/IClientService";

const app = createApp(App);
const clientService: IClientService = new ClientService();
app.provide<IClientService>("clientService", clientService);
app.mount("#app");
