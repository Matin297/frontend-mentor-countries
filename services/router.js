const ROUTER = {
  init() {
    this.go(location.pathname);

    window.addEventListener("popstate", (event) => {
      this.go(event.state.path, false);
    });
  },
  go(path, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ path }, "", path);
    }

    let page = null;

    if (path === "/" || path === "/index.html") {
      page = document.createElement("countries-page");
    } else if (path.startsWith("/country/")) {
      page = document.createElement("country-details-page");
      const [_, __, name = ""] = path.split("/");
      page.dataset.name = name;
    } else {
      page = document.createElement("not-found");
    }

    const pageContainer = document.getElementById("page-container");
    pageContainer.innerHTML = "";
    pageContainer.append(page);
  },
};

export default ROUTER;
