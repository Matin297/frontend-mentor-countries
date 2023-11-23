import store from "./services/store.js";

import { loadCountries } from "./services/countries.js";

window.countries_app = {};
countries_app.store = store;

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready for manipulation");

  loadCountries();
});
