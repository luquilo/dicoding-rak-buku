const localStorageKey = 'books'
if(localStorage.getItem(localStorageKey) == null){
    localStorage.setItem(localStorageKey, [])
}

let books = []

console.log(books)

//mengecek apakah support local storage atau tidak
function isStorageExist() {
    if (typeof Storage === undefined) {
      alert("Maaf browser anda tidak support local storage");
      return false;
    }
}

// selector
const inputBookForm = document.getElementById('inputBook')
const deleteBook1 = document.querySelector('#deleteBook')
const deleteBook2 = document.querySelector('#deleteBook2')
const tandaiSelesai = document.getElementById('tandaiSelesai')
const tandaiBelumSelesai = document.getElementById('tandaiBelumSelesai')
const completeBookshelfList = document.querySelector('#completeBookshelfList')

// menghapus semua local storage
function clearLocalStorage() {
    localStorage.clear();
}

// function menghapus buku dari rak belum selesai
// deleteBook1.addEventListener('click', function(){
//     console.log('buku dihapus!')
// })

// // function menghapus buku dari rak selesai
// deleteBook2.addEventListener('click', function(){
//     console.log('buku dihapus!')
// })

// // function tandai buku telah selesai
// tandaiSelesai.addEventListener('click', function(){
//     console.log('buku ditandai selesai!')
// })

// // function tandai buku belum selesai
// tandaiBelumSelesai.addEventListener('click', function(){
//     console.log('buku ditandai belum selesai!')
// })



// function me render buku di rak selesai
function renderCompleteBooks(){
    const rawLocalBook = localStorage.getItem(localStorageKey)
    const localBook = JSON.parse(rawLocalBook)

    console.log(localBook)
    // map dari localStorage
    const bookElements = localBook.map(book => {
        return `
            <article class='book_item' id='${book.id}'>
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
           
                <div class="action">
                  <button class="green" id="tandaiSelesai">pindah rak</button>
                  <button class="red" id="deleteBook">Hapus buku</button>
                </div>
            </article>
        `
    })

    const bookListHTML = bookElements.join('')
    return bookListHTML
}

// completeBookshelfList.innerHTML = renderCompleteBooks()

// function jika form di submit
inputBookForm.addEventListener('submit', function(event){
    event.preventDefault();   

    const id = +new Date();
    const title = document.getElementById('inputBookTitle').value
    const author = document.getElementById('inputBookAuthor').value
    const year = document.getElementById('inputBookYear').value
    const isComplete = document.querySelector('#inputBookIsComplete').checked ? true : false
   
    function generateBookObject(){
        return{
            id,
            title,
            author,
            year,
            isComplete
        }
    }

    const newBook = generateBookObject()
    books.push(newBook)

    const bookStrings = localStorage.getItem('books')
    books = JSON.parse(bookStrings)


    // membersihkan form
    inputBookTitle.value = ''
    inputBookAuthor.value = ''
    inputBookYear.value = ''
    inputBookIsComplete.checked = false 





    // alert terimakasih
    alert('terimakasih telah mengisi formulir!')

    // console.log(`${id} ${judul} ${penulis} ${tahun} ${isComplete}`)
})





