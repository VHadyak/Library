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

Book.prototype.readStatus = function() {
  return this.isRead === true ? "Read" : "Not Read";
};

// Change read status based on the button clicked
function toggleReadStatus(readBtn, book) {
  readBtn.addEventListener("click", () => {
    if (readBtn.textContent === "Read") {      
      readBtn.textContent = "Not Read";
      book.isRead = false;
      console.log(book);
    } else {
      readBtn.textContent = "Read";
      book.isRead = true;
      console.log(book);
    };
  }); 
};

// Convert user input to an object and push it to a Library array
function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const genre = document.querySelector("#genre").value;
  const pages = document.querySelector("#pageCount").value;
  const isRead = document.querySelector("#isRead").checked;

  const newBook = new Book(title, author, genre, pages, isRead);
  myLibrary.push(newBook);

  // Check if books are added correctly 
  console.log(myLibrary);
};

// Reset input values after the modal has been submitted
function resetValues() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#genre").value = "";
  document.querySelector("#pageCount").value = "";
  document.querySelector("#isRead").checked = false;
};

function displayBook() {
  libraryContainer.textContent = "";                      // For each newly added book, erase the previous one that is in an array

  myLibrary.forEach((book) => {
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");

    let bookCard = document.createElement("div");
    bookCard.classList.add("book-sample");

    let bookTitle = document.createElement("h1");
    bookTitle.textContent = book.title;

    let bookImg = document.createElement("img");
    bookImg.classList.add("book-cover");                  // Generate random cover for each new book created ****

    let btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    let delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");

    let readBtn = document.createElement("button");
    readBtn.classList.add("read-btn");
    
    readBtn.textContent = book.readStatus();             // Add a content box for this read status

    libraryContainer.appendChild(bookContainer);
    bookContainer.appendChild(bookCard);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookImg); 
    btnContainer.appendChild(delBtn);
    btnContainer.appendChild(readBtn);
    bookContainer.appendChild(btnContainer);

    deleteBook(delBtn, bookContainer);
    toggleReadStatus(readBtn, book);
  });
};

// Remove book from the library 
function deleteBook(delBtn, book) {
  delBtn.addEventListener("click", () => {
    updateIndex();
    let index = book.getAttribute("data-index");
    
    myLibrary.splice(index, 1);
    book.remove();

    // Check if books are removed correctly 
    console.log(myLibrary);
  });
};

// Set an index for each book
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



