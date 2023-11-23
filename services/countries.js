import { fetchCountries } from "./api.js";

export async function loadCountries() {
  const countries = await fetchCountries();
  countries_app.store.countries = countries;
}
