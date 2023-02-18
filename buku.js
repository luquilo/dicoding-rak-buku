//mengecek apakah support local storage atau tidak
function isStorageExist() {
    if (typeof Storage === undefined) {
      alert("Maaf browser anda tidak support local storage");
      return false;
    }
}

const localStorageKey = 'books'
const initialDummyData = [{
    id: 1010101010,
    title: 'judul buku',
    author: 'author 1',
    year: 2003,
    isComplete: true,
}]

if(localStorage.getItem(localStorageKey) === null){
    localStorage.setItem(localStorageKey, JSON.stringify(initialDummyData))
}

let books = JSON.parse(localStorage.getItem(localStorageKey))
console.log(books)

// menghapus semua local storage
function clearLocalStorage() {
    localStorage.clear();
}

// function me render buku di rak selesai
function renderUncompletedBooks(){
    const rawLocalBooks = localStorage.getItem(localStorageKey)
    const localBooks = JSON.parse(rawLocalBooks)

    // mem-filter buku yang belum complete
    const filteredUncompletedBooks = localBooks.filter(book => book.isComplete === false)

    // map dari localStorage
    const renderUncompletedBooks = filteredUncompletedBooks.map(book => {
        
        return `
            <article class='book_item'>
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
           
                <div class="action">
                  <button class="green ${book.id}">pindah rak</button>
                  <button class="red" id='${book.id}'>Hapus buku</button>
                </div>
            </article>
        `
    })    

    // const bookListHTML = bookElements.join('')
    return renderUncompletedBooks

}

// invoke render
const unCompleteBookshelfList = document.getElementById('unCompleteBookshelfList')
unCompleteBookshelfList.innerHTML = renderUncompletedBooks()

// function me render buku di rak selesai
function renderCompleteBooks(){
    const rawLocalBooks = localStorage.getItem(localStorageKey)
    const localBooks = JSON.parse(rawLocalBooks)

    const filteredCompletedBooks = localBooks.filter(book => book.isComplete === true)

    // map dari localStorage
    const renderCompletedBooks = filteredCompletedBooks.map(book => {
        
        return `
            <article class='book_item'>
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
           
                <div class="action">
                  <button class="green ${book.id}">pindah rak</button>
                  <button class="red" id='${book.id}'>Hapus buku</button>
                </div>
            </article>
        `
    })    

    // const bookListHTML = bookElements.join('')
    return renderCompletedBooks

}

const completeBookshelfList = document.querySelector('#completeBookshelfList')
completeBookshelfList.innerHTML = renderCompleteBooks()



// delete selector, returning an html collection
const deleteButtons = document.querySelectorAll('.red')

function removeBook(bookId){
    console.log(bookId)
    // retrieve books localStorage
    const localBooks = JSON.parse(localStorage.getItem(localStorageKey))
    console.log(localBooks)

}

// function menghapus buku
deleteButtons.forEach(button => {
    button.addEventListener('click', function(){
        console.log(button)
        removeBook(button.id)
    })
})



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

// form selector
const inputBookForm = document.getElementById('inputBook')
// function jika form di submit
inputBookForm.addEventListener('submit', function(event){
    // event.preventDefault();   

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

    localStorage.setItem(localStorageKey, JSON.stringify(books))
    
    // updating the books array berdasarkan local storage
    books = JSON.parse(localStorage.getItem(localStorageKey))
    console.log(books)


    // // membersihkan form
    // inputBookTitle.value = ''
    // inputBookAuthor.value = ''
    // inputBookYear.value = ''
    // inputBookIsComplete.checked = false 





    // alert terimakasih
    alert('terimakasih telah mengisi formulir!')
})







