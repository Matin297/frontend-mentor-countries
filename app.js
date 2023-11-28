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

document.getElementById("theme-switch").addEventListener("click", (event) => {
  const button = event.currentTarget;
  let theme, name, icon;

  if (document.documentElement.dataset.theme === "dark") {
    theme = "light";
    icon = "moon-outline";
    name = "Dark Mode";
  } else {
    theme = "dark";
    icon = "sunny-outline";
    name = "Light Mode";
  }

  document.documentElement.dataset.theme = theme;
  button.querySelector("span").textContent = name;
  button.querySelector("ion-icon").name = icon;
});
