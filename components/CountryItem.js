export default class CountryItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.getElementById("country-item-template");
    const content = template.content.cloneNode(true);

    this.append(content);

    const country = JSON.parse(this.dataset.country);

    this.querySelector("a").addEventListener("click", (event) => {
      event.preventDefault();
      countries_app.router.go(`/country/${country.name}`);
    });

    this.querySelector("img").src = country.flag;
    this.querySelector("h2").textContent = country.name;
    this.querySelector(".country__population").textContent = country.population;
    this.querySelector(".country__region").textContent = country.region;
    this.querySelector(".country__capital").textContent = country.capital;
  }
}
