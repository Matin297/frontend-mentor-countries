const STYLE_SHEETS = [
  {
    path: "/",
    name: "styles",
  },
  {
    path: "/components/",
    name: "CountriesPage",
  },
  {
    path: "/components/",
    name: "CountryItem",
  },
  {
    path: "/components/",
    name: "CountrySearch",
  },
  {
    path: "/components/",
    name: "CountryFilter",
  },
];

export default class CountriesPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    window.addEventListener("countrieschange", () => {
      this.render();
    });
    this.init();
    this.render();
  }

  init() {
    this.attachShadow({ mode: "open" });

    const search = document.createElement("country-search");
    const filter = document.createElement("country-filter");

    const filterSection = document.createElement("section");
    filterSection.id = "filter-container";
    filterSection.append(search, filter);

    const countriesSection = document.createElement("section");
    countriesSection.id = "countries-container";

    const stylesheets = this.generateStylesheetLinks();

    this.shadowRoot.append(...stylesheets, filterSection, countriesSection);
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

  generateStylesheetLinks() {
    return STYLE_SHEETS.map(({ name, path }) => {
      const link = document.createElement("link");
      link.href = `${path}${name}.css`;
      link.rel = "stylesheet";
      return link;
    });
  }
}
