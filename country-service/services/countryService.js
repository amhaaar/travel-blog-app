const axios = require("axios");

async function getFilteredCountries() {
  const response = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,capital,population,currencies,languages,flags"
  );

  const filteredData = response.data.map((country) => ({
    name: country.name?.common || "Unknown",
    capital: country.capital?.[0] || "N/A",
    population: country.population || 0,
    currencies: country.currencies
      ? Object.values(country.currencies)
          .map((c) => `${c.name} (${c.symbol || ""})`)
          .join(", ")
      : "N/A",
    languages: country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A",
    flag: country.flags?.png || "",
  }));

  return filteredData;
}

module.exports = {
  getFilteredCountries,
};
