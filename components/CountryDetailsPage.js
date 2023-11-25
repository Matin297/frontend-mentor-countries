import { fetchStyles } from "../services/api.js";
import { findCountryByName } from "../services/countries.js";

export default class CountryDetailsPage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");

    fetchStyles("/", "styles").then((styles) => {
      style.innerHTML += styles;
    });

    fetchStyles("/components/", "CountryDetailsPage").then((styles) => {
      style.innerHTML += styles;
    });

    const template = document.getElementById("country-details-template");
    const content = template.content.cloneNode(true);

    this.shadowRoot.append(style, content);
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const country = await findCountryByName(
      decodeURIComponent(this.dataset.name)
    );

    this.shadowRoot.querySelector("img").src = country.flag;
    this.shadowRoot.querySelector("h2").textContent = country.name;

    this.shadowRoot.querySelector(".details__native-name").textContent =
      country.nativeName;
    this.shadowRoot.querySelector(".details__population").textContent =
      country.population;
    this.shadowRoot.querySelector(".details__region").textContent =
      country.region;
    this.shadowRoot.querySelector(".details__sub-region").textContent =
      country.subregion;
    this.shadowRoot.querySelector(".details__capital").textContent =
      country.capital;

    this.shadowRoot.querySelector(".details__tl-domain").textContent =
      country.topLevelDomain.join(", ");
    this.shadowRoot.querySelector(".details__currencies").textContent =
      country.currencies.map(({ name }) => name).join(", ");
    this.shadowRoot.querySelector(".details__languages").textContent =
      country.languages.map(({ name }) => name).join(", ");
  }
}
