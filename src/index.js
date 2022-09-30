import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchOptions = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  fetchCountries(e.target.value.trim()).then(countries => {
    moreTenCountries(countries);
    lotCountries(countries);
    oneCountries(countries);
    noCountries(countries);
  });
  refs.list.textContent = '';
  refs.info.textContent = '';
}

// https://restcountries.com/v2/all?fields=name,capital,currencies
// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?${searchOptions}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function moreTenCountries(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.', {
      position: 'center-top',
    });
  }
}

function noCountries(countries) {
  if (countries.length === 0) {
    Notify.info('Oops, there is no country with that name', {
      position: 'center-top',
    });
  }
}

function lotCountries(countries) {
  if (countries.length >= 2 && countries.length <= 10) {
    const listMarkup = countries
      .map(({ flags, name }) => {
        return `<li><img src="${flags.svg}"
          alt="${name.official}">
          <p>${name.official}</p></li>`;
      })
      .join('');
    refs.list.innerHTML = listMarkup;
    return;
  }
}

function oneCountries(countries) {
  const infoMarkup = countries
    .map(({ flags, name, capital, population, languages }) => {
      return `<img src="${flags.svg}"
          alt="${name.official}">
          <p>${name.official}</p>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${Object.values(languages)}</p>`;
    })
    .join('');
  refs.info.innerHTML = infoMarkup;
}
