
const libraryContainer = document.querySelector(".library-wrapper");

const myLibrary = [];

function Book(title) {
  this.title = title;
};

 // User input
const book1 = new Book("Book1");         
const book2 = new Book("Book2");

function addBookToLibrary() {
  myLibrary.push(book1);
  myLibrary.push(book2);
};
addBookToLibrary();

function displayBooks() {
  myLibrary.forEach((book) => {
    console.log(book);
  });
};

displayBooks();











//for (let obj of myLibrary) {
  //for (let key in obj) {
    //console.log("-Book Obj-");
    //if (obj.hasOwnProperty(key)) {
      //console.log(`${key}: ${obj[key]}`)
    //};
  //};
//};