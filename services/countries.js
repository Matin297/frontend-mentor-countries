import { fetchCountries } from "./api.js";
import { debounce } from "./utility.js";

export async function loadCountries(filterCb) {
  let countries = await fetchCountries();

  if (filterCb) {
    countries = countries.filter(filterCb);
  }

  countries_app.store.countries = countries;
}

export const debouncedLoadCountries = debounce(loadCountries);
