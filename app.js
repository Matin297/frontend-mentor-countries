import store from "./services/store.js";
import router from "./services/router.js";

import { setupComponents } from "./components/setup.js";
import { loadCountries } from "./services/countries.js";

window.countries_app = {};
countries_app.store = store;
countries_app.router = router;

setupComponents();

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready for manipulation");

  countries_app.router.init();
  loadCountries();
});
