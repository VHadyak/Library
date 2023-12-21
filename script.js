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
  this.color = createGradient();
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

function readBtnHandler(readBtn, color, text) {
  readBtn.style.backgroundColor = color;
  readBtn.textContent = text;
};

// Change status of a button
Book.prototype.readStatus = function(readBtn) {
  function updateBtn() {
    if (this.isRead) {
      readBtnHandler(readBtn, "green", "Read");
    } else {
      readBtnHandler(readBtn, "red", "Not Read");
    };
  };

  updateBtn.call(this);                                                        // Set 'this' to the book object in invoked function

  readBtn.addEventListener("click", () => {
    this.isRead = !this.isRead;                                                // If true, assign false
    updateBtn.call(this);
  });

  return readBtn.textContent;
};

function displayBook() {
  libraryContainer.textContent = "";                                           // For each newly added book, only include the current one on display (Avoids multiplying)

  myLibrary.forEach((book) => {
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");

    let bookCard = document.createElement("div");
    bookCard.classList.add("book-sample");

    let bookTitle = document.createElement("h1");
    bookTitle.textContent = book.title;

    let author = document.createElement("p");
    let genre = document.createElement("p");
    let numOfPages = document.createElement("p");
    author.textContent = `Book author: ${book.author}`;
    genre.textContent = `Genre: ${book.genre}`;
    numOfPages.textContent = `Number of pages: ${book.pages}`;

    let bookCover = document.createElement("div");
    bookCover.classList.add("book-cover");         
    bookCover.style.background = book.color || createGradient();               // If color is assigned to a book, do not generate a new color for the same book!

    let innerContent = document.createElement("div");
    innerContent.classList.add("inner-container");

    let contentText = document.createElement("div");
    contentText.classList.add("small-content");

    let btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    let delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");

    let readBtn = document.createElement("button");
    readBtn.classList.add("read-btn");
    
    readBtn.textContent = book.readStatus(readBtn);                            

    innerContent.appendChild(contentText);
    contentText.appendChild(author);
    contentText.appendChild(genre);
    contentText.appendChild(numOfPages);
    bookContainer.appendChild(bookCard);
    bookContainer.appendChild(innerContent);
    libraryContainer.appendChild(bookContainer);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookCover); 
    btnContainer.appendChild(delBtn);
    btnContainer.appendChild(readBtn);
    bookContainer.appendChild(btnContainer);

    deleteBook(delBtn, bookContainer);
  });
};

function generateColor() {
  let letters = "0123456789ABCDEF"
  let color = "#";

  for (let i = 0; i < 6; i++) {
     color += letters[Math.floor(Math.random() * 16)];                         // Append 6-char hex code to create a color 
  };
  return color;
};

// Generate random mixture of colors for book covers
function createGradient() {
  const colors = [];
  for (let i = 0; i < 4; i++) {
    colors.push(generateColor());
  };

  return `linear-gradient(to bottom left, ${colors.join(", ")})`;
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

// Reset input values after the modal has been submitted
function resetValues() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#genre").value = "";
  document.querySelector("#pageCount").value = "";
  document.querySelector("#isRead").checked = false;
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
  const form = document.querySelector("form");
  if (form.checkValidity()) {
    e.preventDefault();
    addBookToLibrary();
    displayBook();
    dialog.close();
  };
});




