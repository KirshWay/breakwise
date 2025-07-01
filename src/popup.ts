import Popup from "./pages/Popup.vue";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

const app = createApp(Popup);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("body");
