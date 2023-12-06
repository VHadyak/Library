
const libraryContainer = document.querySelector(".library-wrapper");
const modalBtn = document.querySelector(".modal-btn");

const myLibrary = [];

function Book(title) {
  this.title = title;
};

 // User inputs 
const book1 = new Book("Book1");         
const book2 = new Book("Book2");
const book3 = new Book("Book3");

function addBookToLibrary() {
  myLibrary.push(book1);
  myLibrary.push(book2);
  myLibrary.push(book3);
};
addBookToLibrary();

function displayBook() {
  myLibrary.forEach((book) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-sample");
    libraryContainer.appendChild(bookCard);


    let bookTitle = document.createElement("h1");
    bookCard.appendChild(bookTitle);

    let bookImg = document.createElement("img");
    bookImg.classList.add("book-cover");                  // Generate random cover for each new book created ****
    bookCard.appendChild(bookImg); 

    bookTitle.textContent = book.title;
  });
};
displayBook();
