import store from "./services/store.js";

window.countries_app = {};
countries_app.store = store;

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready for manipulation");
});
