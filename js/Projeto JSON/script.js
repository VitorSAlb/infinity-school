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

    bookList.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Gênero:</strong> ${book.genre}</p>
            <p><strong>Ano de Publicação:</strong> ${book.year}</p>
            <p><strong>Avaliação:</strong> ${book.rating}/5</p>
        `;
        bookListElement.appendChild(card);
    });
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
