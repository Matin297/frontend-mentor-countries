const URL = {
  countries: "/data.json",
};

export async function fetchCountries() {
  const response = await fetch(URL.countries);
  return await response.json();
}
