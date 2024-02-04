let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const container = document.getElementById('books-container');
  container.innerHTML = ''; // Clear previous books
  myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <button class="remove-book" data-index="${index}">Remove</button>
      <button class="toggle-read" data-index="${index}">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll('.remove-book').forEach(button => {
    button.addEventListener('click', removeBook);
  });

  document.querySelectorAll('.toggle-read').forEach(button => {
    button.addEventListener('click', toggleReadStatus);
  });
}

function removeBook(event) {
  const index = event.target.getAttribute('data-index');
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(event) {
  const index = event.target.getAttribute('data-index');
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

document.getElementById('new-book-btn').addEventListener('click', () => {
  document.getElementById('book-form-dialog').showModal();
});

document.getElementById('book-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  addBookToLibrary(title, author, pages, read);
  document.getElementById('book-form-dialog').close();
});

// Example books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false);
addBookToLibrary('1984', 'George Orwell', 328, true);

// Existing JavaScript code remains the same.

// Additional code for smooth dialog animations.
const dialog = document.getElementById('book-form-dialog');
document.getElementById('new-book-btn').addEventListener('click', () => {
  dialog.showModal();
  dialog.style.opacity = 0;
  setTimeout(() => dialog.style.opacity = 1, 10); // Smooth fade-in effect
});

dialog.querySelector('form').addEventListener('submit', () => {
  setTimeout(() => dialog.close(), 300); // Delay closing for smooth fade-out
  dialog.style.opacity = 0;
});
