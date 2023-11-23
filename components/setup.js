import CountriesPage from "./CountriesPage.js";
import CountrySearch from "./CountrySearch.js";
import CountryFilter from "./CountryFilter.js";
import CountryItem from "./CountryItem.js";

export function setupComponents() {
  customElements.define("countries-page", CountriesPage);
  customElements.define("country-search", CountrySearch);
  customElements.define("country-filter", CountryFilter);
  customElements.define("country-item", CountryItem);
}
