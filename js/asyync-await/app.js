const BREEDS_API = 'https://dog.ceo/api/breeds/list/all';
const RANDOM_IMAGES_API = 'https://dog.ceo/api/breed';

const breedButtonsContainer = document.getElementById('breed-buttons');
const imagesContainer = document.getElementById('images');
const searchBar = document.getElementById('search-breed');
const resetButton = document.getElementById('reset-button');

let activeButton = null;
let breedsList = [];

const loadingMessage = document.createElement('p');
loadingMessage.textContent = 'Carregando...';
loadingMessage.style.fontWeight = 'bold';
loadingMessage.style.fontSize = '1.2em';
loadingMessage.style.color = '#007bff';
loadingMessage.style.display = 'none'; 
imagesContainer.appendChild(loadingMessage);

async function fetchBreeds() {
  try {
    loadingMessage.style.display = 'block'; 
    const response = await fetch(BREEDS_API);
    const data = await response.json();
    breedsList = Object.keys(data.message);
    
    displayBreeds(breedsList);

    searchBar.addEventListener('input', (e) => filterBreeds(e.target.value));
  } catch (error) {
    console.error('Falha ao buscar raças:', error);
    breedButtonsContainer.innerHTML = `<p>Erro ao carregar raças. Tente novamente.</p>`;
  } finally {
    loadingMessage.style.display = 'none';
  }
}

function filterBreeds(searchTerm) {
  const filteredBreeds = breedsList.filter(breed => breed.toLowerCase().includes(searchTerm.toLowerCase()));
  displayBreeds(filteredBreeds);
}

function displayBreeds(breeds) {
  breedButtonsContainer.innerHTML = '';
  breeds.forEach(breed => {
    const button = document.createElement('button');
    button.textContent = breed;
    button.onclick = () => handleBreedSelection(breed, button);
    breedButtonsContainer.appendChild(button);
  });
}

async function handleBreedSelection(breed, button) {
  if (activeButton) {
    activeButton.classList.remove('active');
  }

  button.classList.add('active');
  activeButton = button;

  await fetchBreedImages(breed); 

  searchBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function fetchBreedImages(breed) {
  try {
    loadingMessage.style.display = 'block';
    const response = await fetch(`${RANDOM_IMAGES_API}/${breed}/images/random/4`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar imagens da raça');
    }

    const data = await response.json();
    displayImages(data.message, breed);
  } catch (error) {
    console.error('Falha ao buscar imagens da raça:', error);
    imagesContainer.innerHTML = `<p>Erro ao carregar imagens. Tente novamente.</p>`;
  } finally {
    loadingMessage.style.display = 'none';
  }
}

function displayImages(images, breed) {
  imagesContainer.innerHTML = ''; 

  const breedContainer = document.createElement('div');
  breedContainer.classList.add('breed-container');

  const breedNameElement = document.createElement('div');
  breedNameElement.classList.add('breed-name');
  breedNameElement.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
  breedContainer.appendChild(breedNameElement);

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('images-container');

  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image;
    imageWrapper.appendChild(imgElement);
  });

  breedContainer.appendChild(imageWrapper);
  imagesContainer.appendChild(breedContainer);
}

resetButton.addEventListener('click', () => {
  imagesContainer.innerHTML = ''; 
  searchBar.value = '';

  if (activeButton) {
    activeButton.classList.remove('active');
    activeButton = null;
  }

  displayBreeds(breedsList);
});

// Inicializa a busca de raças
fetchBreeds();
