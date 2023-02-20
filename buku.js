//mengecek apakah web browser meng-support local storage atau tidak
function isLocalstorageExist() {
    if (typeof Storage === undefined) {
      alert("Maaf browser anda tidak support local storage");
    }
}
isLocalstorageExist()


const localStorageKey = 'books'
const initialDummyData = [{
    id: 1010101010,
    title: 'judul buku',
    author: 'author 1',
    year: 2003,
    isComplete: true
}]

if(localStorage.getItem(localStorageKey) === null){
    localStorage.setItem(localStorageKey, JSON.stringify(initialDummyData))
}


// menghapus semua local storage
function clearLocalStorage() {
    localStorage.clear();
}

// function me render buku di rak selesai
function renderUncompletedBooks(){
    const localBooks = JSON.parse(localStorage.getItem(localStorageKey))

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
                  <button class="green" data-id='${book.id}'>pindah rak</button>
                  <button class="red" data-id='${book.id}'>Hapus buku</button>
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
    // ngambil data dari local storage
    const localBooks = JSON.parse(localStorage.getItem(localStorageKey))

    const filteredCompletedBooks = localBooks.filter(book => book.isComplete === true)

    // map dari localStorage
    const renderCompletedBooks = filteredCompletedBooks.map(book => {
        
        return `
            <article class='book_item'>
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
           
                <div class="action">
                  <button class="green" data-id='${book.id}' >pindah rak</button>
                  <button class="red" data-id='${book.id}'>Hapus buku</button>
                </div>
            </article>
        `
    })    

    // const bookListHTML = bookElements.join('')
    return renderCompletedBooks

}

const completeBookshelfList = document.getElementById('completeBookshelfList')
completeBookshelfList.innerHTML = renderCompleteBooks()



// delete selector, returning an html collection
const redButtons = document.querySelectorAll('.red')

// function menghapus buku
function deleteBook(event){
    // data_id memiliki tipe data string
    const data_id = event.getAttribute('data-id')

    const localBooks = JSON.parse(localStorage.getItem(localStorageKey))

    // using filter method that return a new array
    const updatedLocalBooks = localBooks.filter(book => book.id !== Number(data_id))
    console.log(updatedLocalBooks)
    // update the localStorage and set it to the new array
    localStorage.setItem(localStorageKey, JSON.stringify(updatedLocalBooks))

    // refresh the web to see the progress of deleting a book
    location.reload()
}

// function menghapus buku
redButtons.forEach(button => {
    button.addEventListener('click', function(){
        deleteBook(button)
    })
})

// green button selector, returning an html collection
const greenButtons = document.querySelectorAll('.green')

// function merubah status isComplete
function changeBookStatus(event){
    const data_id = event.getAttribute('data-id')

    const localBooks = JSON.parse(localStorage.getItem(localStorageKey))
    const bookTarget = localBooks.findIndex(book => book.id == data_id)
    localBooks[bookTarget].isComplete = !localBooks[bookTarget].isComplete
    console.log(localBooks)
    localStorage.setItem(localStorageKey, JSON.stringify(localBooks))
    
    // refresh web biar kelihatan dampaknya
    location.reload()   
}

// mengganti status isComplete
greenButtons.forEach(button => {
    button.addEventListener('click', function(){
        changeBookStatus(button)
    })
})

// form selector
const inputBookForm = document.getElementById('inputBook')
// function jika form di submit
inputBookForm.addEventListener('submit', function(event){

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

    const localBooks = JSON.parse(localStorage.getItem('books'))

    const newBook = generateBookObject()
    localBooks.push(newBook)

    localStorage.setItem(localStorageKey, JSON.stringify(localBooks))
    
    // alert terimakasih
    alert('terimakasih telah mengisi formulir buku!')
})







