import { fetchStyles } from "../services/api.js";

export default class CountriesPage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    let style = document.createElement("style");

    fetchStyles("/", "styles").then((styles) => {
      style.textContent = styles;
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

    if (!countries) {
      list = document.createElement("p");
      list.textContent = "No countries yet!";
    } else {
      list = document.createElement("ul");

      const listItems = countries.map((country) => {
        const item = document.createElement("li");
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
