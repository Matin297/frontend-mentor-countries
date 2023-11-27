import { fetchStyles } from "../services/api.js";

export default class CountriesPage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");

    Promise.allSettled([
      fetchStyles("/", "styles"),
      fetchStyles("/components/", "CountriesPage"),
      fetchStyles("/components/", "CountryItem"),
      fetchStyles("/components/", "CountrySearch"),
      fetchStyles("/components/", "CountryFilter"),
    ]).then((results) => {
      results.forEach(({ value }) => {
        style.innerHTML += value;
      });
    });

    const search = document.createElement("country-search");
    const filter = document.createElement("country-filter");
    const countriesSection = document.createElement("section");
    countriesSection.id = "countries-container";

    this.shadowRoot.append(style, search, filter, countriesSection);
  }

  connectedCallback() {
    window.addEventListener("countrieschange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    let list;
    const countries = countries_app.store.countries;

    if (!countries || countries.length === 0) {
      list = document.createElement("p");
      list.textContent = "No Countries!";
    } else {
      list = document.createElement("ul");

      const listItems = countries.map((country) => {
        const item = document.createElement("country-item");
        const data = {
          flag: country.flag,
          name: country.name,
          population: country.population,
          region: country.region,
          capital: country.capital,
        };
        item.dataset.country = JSON.stringify(data);
        return item;
      });

      list.append(...listItems);
    }

    const countriesContainer = this.shadowRoot.getElementById(
      "countries-container"
    );
    countriesContainer.innerHTML = "";
    countriesContainer.append(list);
  }
}
