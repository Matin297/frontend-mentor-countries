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
  }
}
