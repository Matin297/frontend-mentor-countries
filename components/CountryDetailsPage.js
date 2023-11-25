export default class CountryDetailsPage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const template = document.getElementById("country-details-template");
    const content = template.content.cloneNode(true);

    this.shadowRoot.append(content);
  }
}
