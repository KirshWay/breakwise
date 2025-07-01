import Popup from "./pages/Popup.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "./main.css";

const app = createApp(Popup);

const pinia = createPinia();

app.use(pinia);

app.mount("body");
