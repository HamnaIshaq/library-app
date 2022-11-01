let myLibrary = [];
let id = 0;

const InputBookTitle = document.querySelector('#book-title');
const InputBookAuthor = document.querySelector('#book-author');
const InputBookTotalPages = document.querySelector('#book-total-pages');
const InputBookStatus = document.querySelector('#book-status');
const btnAddNewBook = document.querySelector('.add-new-book');
const tableBody = document.querySelector('.table-body');

btnAddNewBook.addEventListener('click', addNewBook);

tableBody.addEventListener('click', updateBook);

// Book constructor
function Book (id, title, author, pages, status) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// UI constructor
function UI () {}

// add book to ui
UI.prototype.addBookToUI = function () {
  
  for(let book = tableBody.children.length; book < myLibrary.length; book++){
    const tableRow = `
      <td>${myLibrary[book].title}</td>
      <td>${myLibrary[book].author}</td>
      <td>${myLibrary[book].pages}</td>
      <td>
        <button class="book-status" data-book-status=${myLibrary[book].status } data-book-id=${myLibrary[book].id}>
          ${myLibrary[book].status === true ?  'Read' : 'Un-read' }
        </button>
      </td>
      <td>
        <button class="remove-book" data-book-id=${myLibrary[book].id} type="button">X</button>
      </td>
    `;

    const tableRowElement = document.createElement('tr');
    tableRowElement.innerHTML = tableRow;

    tableBody.appendChild(tableRowElement);
  }
}

// delete book from ui
UI.prototype.deleteBookFromUI = function (target) {
  target.parentElement.parentElement.remove();
}

// clear book fields
UI.prototype.clearBookFields = function () {
  InputBookTitle.value = '';
  InputBookAuthor.value = '';
  InputBookTotalPages.value = '';
  InputBookStatus.checked = false;
}

// change book status from ui
UI.prototype.changeBookStatusFromUI = function (target) {
  let currentStatus = (target.getAttribute('data-book-status') === 'true');
  
  if(currentStatus === true) {
    target.textContent = 'Un-read';
  }
  else {
    target.textContent = 'Read';
  }
  
  currentStatus = !currentStatus;
  target.setAttribute('data-book-status', currentStatus);
}

// delete book from library
function deleteBookFromLibrary (target) {
  const bookId = parseInt(target.getAttribute('data-book-id'));
  
  for(let book = 0; book < myLibrary.length; book++) {
    if(myLibrary[book].id === bookId) {
      myLibrary.splice(book, 1);
    }
  }
}

// change book status from library
function changeBookStatusFromLibrary (target) {
  const bookId = parseInt(target.getAttribute('data-book-id'));

  for(let book = 0; book < myLibrary.length; book++) {
    if(myLibrary[book].id === bookId) {
      myLibrary[book].status = !myLibrary[book].status;
    }
  }  
}

function addNewBook (event) {

  const title = InputBookTitle.value;
  const author = InputBookAuthor.value;
  const pages = InputBookTotalPages.value;
  const status = InputBookStatus.checked;
  id = id + 1;
  
  const book = new Book (id, title, author, pages, status)

  myLibrary.push(book);

  const ui = new UI();

  ui.addBookToUI();

  ui.clearBookFields();

  event.preventDefault();
}

function updateBook (event) {
  if(event.target.classList.contains('remove-book')) {
    removeBook(event.target);
  }
  else if(event.target.classList.contains('book-status')) {
    changeBookStatus(event.target);
  }

  event.preventDefault();

}

function removeBook (target) {

  const ui = new UI()

  ui.deleteBookFromUI(target);

  deleteBookFromLibrary(target);
}

function changeBookStatus(target) {
  const ui = new UI();

  ui.changeBookStatusFromUI(target);

  changeBookStatusFromLibrary(target);
  console.log(myLibrary)
}