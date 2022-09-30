import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', fetchCountries);

// function inputCountries() {}

function fetchCountries(name) {
  fetch('https://restcountries.com/v2/all?fields=uk')
    .then(response => {
      return response.json();
    })
    .then(country => {
      console.log(country);
      const markup = `<h2>${name.official}</h2>
<p>Capital: ${capital}</p>
<p>Population: ${population}</p>
<p>Languages: ${languages}</p>`;
      refs.list.innerHTML = markup;
      console.log(markup);
    })
    .catch(error => {
      console.log(error);
    });
}

// function countryCard(country) {
//   return `<h2>${flags.svg} ${name.official}</h2>
// <p>Capital: ${capital}</p>
// <p>Population: ${population}</p>
// <p>Languages: ${languages}</p>`;
// }
