import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Функция для отображения ошибки
function showError() {
  error.style.display = 'block';
}

// Функция для скрытия ошибки
function hideError() {
  error.style.display = 'none';
}

// Функция для отображения загрузчика
function showLoader() {
  loader.style.display = 'block';
}

// Функция для скрытия загрузчика
function hideLoader() {
  loader.style.display = 'none';
}

// Функция для отображения информации о коте
function showCatInfo(cat) {
  catInfo.innerHTML = `
    <p>Breed: ${cat[0].breeds[0].name}</p>
    <p>Description: ${cat[0].breeds[0].description}</p>
    <p>Temperament: ${cat[0].breeds[0].temperament}</p>
    <img src="${cat[0].url}" alt="Cat Image">
  `;
  catInfo.style.display = 'block';
}

// Функция для скрытия информации о коте
function hideCatInfo() {
  catInfo.style.display = 'none';
}

// Обработчик события изменения выбора породы
breedSelect.addEventListener('change', function () {
  const selectedBreedId = this.value;

  hideError();
  showLoader();
  hideCatInfo();

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      hideLoader();
      showCatInfo(cat);
    })
    .catch(() => {
      hideLoader();
      showError();
    });
});

// Инициализация страницы
hideError();
showLoader();
hideCatInfo();

fetchBreeds()
  .then(breeds => {
    hideLoader();
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
    breedSelect.style.display = 'block';
  })
  .catch(() => {
    hideLoader();
    showError();
  });

// const URL = "https://api.thecatapi.com/v1/breeds";
//     fetch(URL).then((response) => {
//     console.log(response);
//     if (!response.ok) {
//       throw new Error("404 not found!");
//     }

//     return response.json();
//   })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(`Fetch error: ${err}`));