const API_KEY = '93f011b0';
const BASE_URL = 'http://www.omdbapi.com/';
const movieListElement = document.getElementById('movie-list');
const searchBar = document.getElementById('search-bar');


async function fetchPopularMovies() {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=batman`); 
        const data = await response.json();
        displayMovies(data.Search || []);
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        movieListElement.innerHTML = '<p>Erro ao carregar filmes. Tente novamente mais tarde.</p>';
    }
}


async function fetchMovies(query = '') {
    if (query.length === 0) {
        fetchPopularMovies(); 
        return;
    }
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();
        displayMovies(data.Search || []);
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        movieListElement.innerHTML = '<p>Erro ao carregar filmes. Tente novamente mais tarde.</p>';
    }
}

function displayMovies(movies) {
    movieListElement.innerHTML = '';
    if (movies.length === 0) {
        movieListElement.innerHTML = '<p>Nenhum filme encontrado.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
        `;
        

        movieElement.onclick = () => showMovieDetails(movie.imdbID);
        
        movieListElement.appendChild(movieElement);
    });
}

async function showMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movieId}`);
        const movie = await response.json();
        alert(`Título: ${movie.Title}\nDescrição: ${movie.Plot}`);
    } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
    }
}

fetchPopularMovies();

searchBar.addEventListener('input', (e) => {
    const query = e.target.value;
    fetchMovies(query);
});
