let books = [
    { title: "One Piece", author: "Eiichiro Oda", genre: "Ação", year: 1997, rating: 5 },
    { title: "Harry Potter e a Pedra Filosofal", author: "J.K. Rowling", genre: "Fantasia", year: 1997, rating: 5 },
    { title: "O Senhor dos Anéis", author: "J.R.R. Tolkien", genre: "Fantasia", year: 1954, rating: 5 },
    { title: "1984", author: "George Orwell", genre: "Distopia", year: 1949, rating: 4 },
    { title: "Dom Casmurro", author: "Machado de Assis", genre: "Literatura Brasileira", year: 1899, rating: 4 }
];

document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    document.getElementById('add-book-form').addEventListener('submit', addBook);
    document.getElementById('search').addEventListener('input', searchBooks);
});

function addBook(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const year = parseInt(document.getElementById('year').value, 10);
    const rating = parseInt(document.getElementById('rating').value, 10);

    const book = { title, author, genre, year, rating };
    books.push(book);
    saveBooks();
    displayBooks();
    document.getElementById('add-book-form').reset();
}

function searchBooks() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
}

function displayBooks(bookList = books) {
    const bookListElement = document.getElementById('book-list');
    bookListElement.innerHTML = '';

    bookList.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Gênero:</strong> ${book.genre}</p>
            <p><strong>Ano de Publicação:</strong> ${book.year}</p>
            <p><strong>Avaliação:</strong> ${book.rating}/5</p>
            <div class="rating-section">
                <button onclick="showRatingInput(${index})">Adicionar Nova Avaliação</button>
                <input type="number" class="rating-input" min="1" max="5" id="rating-${index}" placeholder="Nova Avaliação">
                <button class="rating-save" onclick="updateRating(${index})">Salvar Avaliação</button>
            </div>
        `;
        bookListElement.appendChild(card);
    });
}

function showRatingInput(index) {
    const ratingInput = document.querySelector(`#rating-${index}`);
    const ratingSave = document.querySelector(`#rating-${index} + .rating-save`);
    const addButton = document.querySelector(`.book-card:nth-child(${index + 1}) .rating-section button`);

    addButton.style.display = 'none';
    ratingInput.style.display = 'inline';
    ratingSave.style.display = 'inline';
}

function updateRating(index) {
    const newRating = parseInt(document.getElementById(`rating-${index}`).value, 10);
    if (newRating >= 0 && newRating <= 5) {
        books[index].rating = newRating;
        saveBooks();
        displayBooks();
    } else {
        alert('Avaliação deve estar entre 0 e 5.');
    }
}

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
        books = JSON.parse(savedBooks);
    }
    displayBooks();
}
