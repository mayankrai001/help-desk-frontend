import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import "./assets/css/main.css";
import '@fortawesome/fontawesome-free/css/all.min.css'

import { inTeams, initializeTeams, getTeamsAuthToken } from "./utils/teams";

const app = createApp(App).use(store).use(router);

const init = async () => {
  if (inTeams()) {
    const success = await initializeTeams();
    if (success) {
      try {
        // Only trigger SSO if not already logged in
        if (!store.getters["auth/isAuthenticated"]) {
          const token = await getTeamsAuthToken();
          await store.dispatch("auth/loginTeamsSSO", token);
        }
      } catch (error) {
        console.error("Teams SSO failed", error);
      }
    }
  }
  app.mount("#app");
};

init();
