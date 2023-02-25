//mengecek apakah web browser meng-support local storage atau tidak
function isLocalstorageExist() {
  if (typeof Storage === undefined) {
    alert("Maaf browser anda tidak support local storage");
  }
}
isLocalstorageExist();
 
const localStorageKey = "books";
const initialDummyData = [
  {
    id: 1010101010,
    title: "judul buku",
    author: "muhammad luqmanul hakim",
    year: 2003,
    isComplete: false,
  },
];
 
if (localStorage.getItem(localStorageKey) === null) {
  localStorage.setItem(localStorageKey, JSON.stringify(initialDummyData));
}
 
const localBooks = JSON.parse(localStorage.getItem(localStorageKey));
 
const searchBook = document.getElementById("searchBook");
let bookTitle = "";
 
searchBook.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchBookTitle = document.getElementById("searchBookTitle").value;
  bookTitle = searchBookTitle;
 
  renderAll(bookTitle);
});
 
function renderUncompletedBooks(foundBooks) {
  let filteredUncompletedBooks = localBooks.filter(
    (book) => book.isComplete === false
  );
 
  if (foundBooks.length > 0) {
    filteredUncompletedBooks = foundBooks.filter(
      (book) => book.isComplete === false
    );
  }
 
  // map dari localStorage
  const renderUncompletedBooks = filteredUncompletedBooks.map((book) => {
    return `
    <div class="book_container books">
    <h3 class="book_h3">${book.title}</h3>
    <p>Penulis: ${book.author}</p>
    <p>Tahun: ${book.year}</p>
 
    <div>
      <button class="green" data-id='${book.id}' >pindah rak</button>
      <button class="red" data-id='${book.id}' title='${book.title}'>Hapus buku</button>
    </div>
</div>
            `;
  });
 
  return renderUncompletedBooks;
}
 
function renderCompleteBooks(foundBooks) {
  let filteredCompletedBooks = localBooks.filter(
    (book) => book.isComplete === true
  );
 
  if (foundBooks.length > 0) {
    filteredCompletedBooks = foundBooks.filter(
      (book) => book.isComplete === true
    );
  }
 
  // map dari localStorage
  const renderCompletedBooks = filteredCompletedBooks.map((book) => {
    return `
                <div class="book_container books">
                    <h3 class="book_h3">${book.title}</h3>
                    <p>Penulis: ${book.author}</p>
                    <p>Tahun: ${book.year}</p>
               
                    <div>
                      <button class="green" data-id='${book.id}' >pindah rak</button>
                      <button class="red" data-id='${book.id}' title='${book.title}'>Hapus buku</button>
                    </div>
                </div>
            `;
  });
 
  // const bookListHTML = bookElements.join('')
  return renderCompletedBooks;
}
 
const unCompleteBookshelfList = document.getElementById(
  "unCompleteBookshelfList"
);
 
const completeBookshelfList = document.getElementById("completeBookshelfList");
 
function renderAll(title = "") {
  if (title.length <= 0) {
    // jika search book title kosong, maka akan merender semua rak
    // merender buku not complete
 
    // invoke rak falsy
    unCompleteBookshelfList.innerHTML = renderUncompletedBooks(title);
 
    // invoke rak buku truthy
    completeBookshelfList.innerHTML = renderCompleteBooks(title);
  } else {
    const judul = title;
 
    // buku yang ditemukan
    const foundBooks = [];
 
    for (let i = 0; i < localBooks.length; i++) {
      if (
        localBooks[i].title.toLowerCase().includes(judul.toLocaleLowerCase())
      ) {
        foundBooks.push(localBooks[i]);
      }
    }
 
    if (foundBooks.length <= 0) {
      unCompleteBookshelfList.innerHTML = `mohon maaf, buku yang berjudul "${title}" tidak ditemukan`;
      completeBookshelfList.innerHTML = `mohon maaf, buku yang berjudul "${title}" tidak ditemukan`;
    }
 
    if (foundBooks.length > 0) {
      unCompleteBookshelfList.innerHTML = renderUncompletedBooks(foundBooks);
      completeBookshelfList.innerHTML = renderCompleteBooks(foundBooks);
    }
 
    // if(title == 'halo'){
    //   unCompleteBookshelfList.innerHTML = renderUncompletedBooks(title)
    //   completeBookshelfList.innerHTML = renderCompleteBooks(title)
    // }
    // else {
    //   unCompleteBookshelfList.innerHTML = `mohon maaf, buku yang berjudul "${title}" tidak ditemukan`
    //   completeBookshelfList.innerHTML = `mohon maaf, buku yang berjudul "${title}" tidak ditemukan`
    // }
  }
}
 
renderAll();
 
// delete selector, returning an html collection
const redButtons = document.querySelectorAll(".red");
 
// function menghapus buku
function deleteBook(event) {
  // data_id memiliki tipe data string
  const data_id = event.getAttribute("data-id");
  const bookTitle = event.getAttribute("title");
 
  const localBooks = JSON.parse(localStorage.getItem(localStorageKey));
 
  // using filter method that return a new array
  const updatedLocalBooks = localBooks.filter(
    (book) => book.id !== Number(data_id)
  );
  // update the localStorage and set it to the new array
  localStorage.setItem(localStorageKey, JSON.stringify(updatedLocalBooks));
  // notifikasi bahwa buku telah dihapus
  alert(`anda telah menghapus buku berjudul "${bookTitle}"`);
 
  // refresh the web to see the progress of deleting a book
  location.reload();
}
 
// function menghapus buku
redButtons.forEach((button) => {
  button.addEventListener("click", function () {
    deleteBook(button);
  });
});
 
// green button selector, returning an html collection
const greenButtons = document.querySelectorAll(".green");
 
// function merubah status isComplete
function changeBookStatus(event) {
  const data_id = event.getAttribute("data-id");
 
  const localBooks = JSON.parse(localStorage.getItem(localStorageKey));
  const bookTarget = localBooks.findIndex((book) => book.id == data_id);
  localBooks[bookTarget].isComplete = !localBooks[bookTarget].isComplete;
  localStorage.setItem(localStorageKey, JSON.stringify(localBooks));
 
  // refresh web biar kelihatan dampaknya
  location.reload();
}
 
// mengganti status isComplete
greenButtons.forEach((button) => {
  button.addEventListener("click", function () {
    changeBookStatus(button);
  });
});
 
// form selector
const inputBookForm = document.getElementById("inputBook");
// function jika form di submit
inputBookForm.addEventListener("submit", function (event) {
  const id = +new Date();
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isComplete = document.querySelector("#inputBookIsComplete").checked
    ? true
    : false;
 
  function generateBookObject() {
    return {
      id,
      title,
      author,
      year,
      isComplete,
    };
  }
 
  const localBooks = JSON.parse(localStorage.getItem("books"));
 
  const newBook = generateBookObject();
  localBooks.push(newBook);
 
  localStorage.setItem(localStorageKey, JSON.stringify(localBooks));
 
  // alert terimakasih
  alert("terimakasih telah mengisi formulir buku!");
});