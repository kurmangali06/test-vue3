import router from "./router/index";
import App from './App.vue'
import { createApp } from "vue";
import './style.css'

const app = createApp(App);

app.use(router);

app.mount("#app");
