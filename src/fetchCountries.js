const searchOptions = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

export const fetchCountries = function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?${searchOptions}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
