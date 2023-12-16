// Vlad Hadyak (Simple Book Library)

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

function resetValues() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#genre").value = "";
  document.querySelector("#pageCount").value = "";
  document.querySelector(".isRead").checked = false;
};

function displayBook() {
  libraryContainer.textContent = "";                      // For each newly added book, erase the previous one that is in an array

  myLibrary.forEach((book) => {
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");

    let bookCard = document.createElement("div");
    bookCard.classList.add("book-sample");

    let bookTitle = document.createElement("h1");

    let bookImg = document.createElement("img");
    bookImg.classList.add("book-cover");                  // Generate random cover for each new book created ****

    let delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");

    libraryContainer.appendChild(bookContainer);
    bookContainer.appendChild(bookCard);

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookImg); 
    bookContainer.appendChild(delBtn);

    bookTitle.textContent = book.title;
    deleteBook(delBtn, bookContainer);
  });
};

// Remove book from the library 
function deleteBook(delBtn, book) {
  delBtn.addEventListener("click", () => {
    updateIndex();
    let index = book.getAttribute("data-index");
    
    myLibrary.splice(index, 1);
    book.remove();
    console.log(myLibrary);
  });
};

// Reassign index position of a book in an arr
function updateIndex() {
  const bookContainers = document.querySelectorAll(".book-container");
  bookContainers.forEach((book, index) => {
    book.setAttribute("data-index", index)
  });
};

// Add a modal for user input
modalBtn.addEventListener("click", () => {
  resetValues();
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  addBookToLibrary();
  displayBook();

  dialog.close();
});


// TODO: Each new del button with book displayed should be clicked a display a message



