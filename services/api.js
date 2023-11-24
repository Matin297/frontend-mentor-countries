const URL = {
  countries: "/data.json",
};

export async function fetchStyles(path, filename) {
  const response = await fetch(`${path}${filename}.css`);
  return await response.text();
}

export async function fetchCountries() {
  const response = await fetch(URL.countries);
  return await response.json();
}
