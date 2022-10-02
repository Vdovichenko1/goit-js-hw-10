import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchInput = e.target.value.trim();
  if (searchInput === '') {
    return;
  }
  fetchCountries(searchInput)
    .then(countries => {
      oneCountries(countries);
      moreTenCountries(countries);
      lotCountries(countries);
    })
    .catch(error => {
      refs.info.textContent = '';
      refs.list.textContent = '';
      Notify.failure('Oops, there is no country with that name', {
        position: 'center-top',
      });
      return error;
    });
}

function moreTenCountries(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.', {
      position: 'center-top',
    });
    return (refs.info.textContent = '');
  }
}

// function noCountries(countries) {
//   if (countries.length < 0) {
//     Notify.failure('Oops, there is no country with that name', {
//       position: 'center-top',
//     });
//   }
// }

function lotCountries(countries) {
  if (countries.length >= 2 && countries.length <= 10) {
    const listMarkup = countries
      .map(({ flags, name }) => {
        return `<li class="country__img"><img src="${flags.svg}"
          alt="${name.official}">
          <h3 class="country__name">${name.official}</h3></li>`;
      })
      .join('');
    refs.list.innerHTML = listMarkup;
    return (refs.info.textContent = '');
  }
}

function oneCountries(countries) {
  const infoMarkup = countries
    .map(({ flags, name, capital, population, languages }) => {
      return `<li class="country__img"><img src="${flags.svg}"
          alt="${name.official}">
          <h3 class="country__name">${name.official}</h3></li>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${Object.values(languages)}</p>`;
    })
    .join('');
  refs.info.innerHTML = infoMarkup;
  return (refs.list.textContent = '');
}
