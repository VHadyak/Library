
const libraryContainer = document.querySelector(".library-wrapper");

const modalBtn = document.querySelector(".modal-btn");
const closeBtn = document.querySelector("dialog button");
const submitBtn = document.querySelector("#submit-btn");
const dialog = document.querySelector("dialog");

const myLibrary = [];

function Book(title, author, genre, pages, isRead) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.isRead = isRead;
};


// Convert user input to an object and push it to a Library array
function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const genre = document.querySelector("#genre").value;
  const pages = document.querySelector("#pageCount").value;
  const isRead = document.querySelector(".isRead").checked;

  const newBook = new Book(title, author, genre, pages, isRead);

  myLibrary.push(newBook);
  console.log(myLibrary);
};


function displayBook() {
  libraryContainer.textContent = "";                      // For each newly added book, erase the previous one that is in an array

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

// Add a modal for user input

modalBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});


submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  addBookToLibrary()
  displayBook();

  dialog.close();
});


