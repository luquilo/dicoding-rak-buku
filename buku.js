//mengecek apakah support local storage atau tidak
function isStorageExist() {
    if (typeof Storage === undefined) {
      alert("Maaf browser anda tidak support local storage");
    }
}
isStorageExist()

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


// function menghapus buku
redButtons.forEach(button => {
    button.addEventListener('click', function(){
        console.log('halo')
    })
})

// green button selector, returning an html collection
const greenButtons = document.querySelectorAll('.green')

// function merubah status isComplete
function changeBookStatus(event){
    const data_id = event.getAttribute('data-id')

    const localBooks = JSON.parse(localStorage.getItem(localStorageKey))
    const bookIndex = localBooks.findIndex(book => book.id == data_id)
    localBooks[bookIndex].isComplete = !localBooks[bookIndex].isComplete
    console.log(localBooks)
    localStorage.setItem(localStorageKey, JSON.stringify(localBooks))
    location.reload()   
}

// mengganti status isComplete
greenButtons.forEach(button => {
    button.addEventListener('click', function(){
        changeBookStatus(button)
    })
})

// // function tandai buku telah selesai
// tandaiSelesai.addEventListener('click', function(){
//     console.log('buku ditandai selesai!')
// })

// // function tandai buku belum selesai
// tandaiBelumSelesai.addEventListener('click', function(){
//     console.log('buku ditandai belum selesai!')
// }    )

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

    const localBooks = JSON.parse(localStorage.getItem('books'))

    const newBook = generateBookObject()
    localBooks.push(newBook)

    localStorage.setItem(localStorageKey, JSON.stringify(localBooks))
    
    // updating the books array berdasarkan local storage
    


    // // membersihkan form
    // inputBookTitle.value = ''
    // inputBookAuthor.value = ''
    // inputBookYear.value = ''
    // inputBookIsComplete.checked = false 





    // alert terimakasih
    alert('terimakasih telah mengisi formulir!')
})







