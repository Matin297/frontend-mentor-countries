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

    this.shadowRoot.append(style, search, filter);
  }

  connectedCallback() {
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
        item.dataset.country = JSON.stringify(country);
        return item;
      });

      list.append(...listItems);
    }

    this.shadowRoot.append(list);
  }
}
