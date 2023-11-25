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
  }
}
