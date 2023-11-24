const STORE = {
  countries: null,
};

const STORE_PROXY = new Proxy(STORE, {
  set(target, property, value) {
    target[property] = value;
    if (property === "countries") {
      window.dispatchEvent(new CustomEvent("countrieschange"));
    }
    return true;
  },
});

export default STORE_PROXY;
