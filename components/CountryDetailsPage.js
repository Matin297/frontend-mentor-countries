import { findCountryBy } from "../services/countries.js";

const STYLE_SHEETS = [
  {
    path: "/",
    name: "styles",
  },
  {
    path: "/components/",
    name: "CountryDetailsPage",
  },
];

export default class CountryDetailsPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.init();
    this.render();
  }

  init() {
    this.attachShadow({ mode: "open" });

    const template = document.getElementById("country-details-template");
    const content = template.content.cloneNode(true);

    const stylesheets = this.generateStylesheetLinks();

    this.shadowRoot.append(...stylesheets, content);
  }

  async render() {
    const country = await findCountryBy(
      (country) => country.name === decodeURIComponent(this.dataset.name)
    );

    this.shadowRoot
      .querySelector(".details__back")
      .addEventListener("click", (event) => {
        event.preventDefault();
        countries_app.router.go("/");
      });

    this.shadowRoot.querySelector("img").src = country.flag;
    this.shadowRoot.querySelector("h2").textContent = country.name;

    this.shadowRoot.querySelector(".details__native-name").textContent =
      country.nativeName;
    this.shadowRoot.querySelector(".details__population").textContent =
      country.population.toLocaleString();
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

    if (country.borders) {
      const bordersContainer =
        this.shadowRoot.querySelector(".details__borders");
      bordersContainer.hidden = false;

      const borderElements = country.borders.map((border) => {
        const borderName = countries_app.store.countries.find(
          (country) => country.alpha3Code === border
        ).name;

        const borderElement = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.textContent = borderName;
        borderElement.append(anchor);
        return borderElement;
      });

      bordersContainer.querySelector("ul").append(...borderElements);
      bordersContainer.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
          event.preventDefault();
          countries_app.router.go(`/country/${event.target.textContent}`);
        }
      });
    }
  }

  generateStylesheetLinks() {
    return STYLE_SHEETS.map(({ name, path }) => {
      const link = document.createElement("link");
      link.href = `${path}${name}.css`;
      link.rel = "stylesheet";
      return link;
    });
  }
}
