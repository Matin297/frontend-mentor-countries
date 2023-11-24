import { debouncedLoadCountries } from "../services/countries.js";

export default class CountrySearch extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.getElementById("country-search-template");
    const content = template.content.cloneNode(true);
    this.append(content);

    this.querySelector("input").addEventListener("input", (event) => {
      const value = event.target.value.toLowerCase();

      debouncedLoadCountries((country) =>
        country.name.toLowerCase().includes(value)
      );
    });
  }
}
