// variaveis
const apiKey = '';
const apiCountryURL = 'https://countryflagsapi.com/png/';
const apiUnsplash = 'https://source.unsplash.com/1600x900/?';

// Seletores
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const umidityElement = document.querySelector('#umidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');

const errorMessageContainer = document.querySelector('#error-message');
const loader = document.querySelector('#loader');

const suggestionContainer = document.querySelector('#suggestions');
const suggestionButtons = document.querySelectorAll('#suggestions button');

// Loader
const toggleLoader = () => {
  // esconder Loader = ( hide )
  loader.classList.toggle('hide');
};

// Pega o conteudo da API
const getWeatherData = async (city) => {
  toggleLoader();

  // Url API Weather -> trocar variaveis {city} e {apikey} dinamico
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL); // Pega o conteudo da Url da Api
  const data = await res.json(); // trasforma a resposta em JSON

  // data contem o conteudo da requisição URL
  console.log(data);

  toggleLoader();

  return data;
};

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove('hide');
};

const hideInformation = () => {
  errorMessageContainer.classList.add('hide');
  weatherContainer.classList.add('hide');

  suggestionContainer.classList.add('hide');
};

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === '404') {
    showErrorMessage();
    return;
  }

  // Imprime a info na tela
  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute('src', apiCountryURL + data.sys.country);
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  // Change bg image
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  // esconde as informaçoes ate que seja chamada
  weatherContainer.classList.remove('hide');
};

// function Event Default do Botão ( Search ) ---- searchBtn
searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const city = cityInput.value; // trasforma em city --------

  showWeatherData(city);
});

// Function KeyUp do Input (enter)
cityInput.addEventListener('keyup', (e) => {
  if (e.code === 'Enter') {
    const city = e.target.value;

    showWeatherData(city);
  }
});

// Sugestões
suggestionButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const city = btn.getAttribute('id');

    showWeatherData(city);
  });
});
