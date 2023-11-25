import { loadCountries } from "../services/countries.js";

export default class CountryFilter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.getElementById("country-filter-template");
    const content = template.content.cloneNode(true);
    this.append(content);

    this.querySelector("select").addEventListener("change", (event) => {
      const value = event.target.value;
      loadCountries((country) => country.region.toLowerCase().includes(value));
    });
  }
}
