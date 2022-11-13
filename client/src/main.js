import { createApp } from "vue";
import App from "./App.vue";
import { axiosDefault } from "@/config/axios";
import Maska from "maska";

const app = createApp(App);

app.config.globalProperties.$axios = axiosDefault;

app.use(Maska).mount("#app");
