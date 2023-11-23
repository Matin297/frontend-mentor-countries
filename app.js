import store from "./services/store.js";

import { setupComponents } from "./components/setup.js";
import { loadCountries } from "./services/countries.js";

window.countries_app = {};
countries_app.store = store;

setupComponents();

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready for manipulation");

  loadCountries();
});
