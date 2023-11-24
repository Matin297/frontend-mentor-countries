const ROUTER = {
  init() {
    this.go(location.pathname);
  },
  go(path, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ path }, "", path);
    }

    let page = null;

    switch (path) {
      case "/":
      case "/index.html":
        page = document.createElement("countries-page");
        break;
      default:
        page = document.createElement("not-found");
    }

    const pageContainer = document.getElementById("page-container");
    pageContainer.innerHTML = "";
    pageContainer.append(page);
  },
};

export default ROUTER;
