const localStorageKey = 'books'

let books = []
const inputBookForm = document.getElementById('inputBook')
const deleteBook = document.querySelector('#deleteBook')
const tandaiSelesai = document.getElementById('tandaiSelesai')
const tandaiBelumSelesai = document.getElementById('tandaiBelumSelesai')

// menghapus semua local storage
function clearLocalStorage() {
    localStorage.clear();
}

// function menghapus buku dari local storage
deleteBook.addEventListener('click', function(){
    console.log('buku dihapus!')
})

// function tandai buku telah selesai
tandaiSelesai.addEventListener('click', function(){
    console.log('buku ditandai selesai!')
})

// function tandai buku belum selesai
tandaiBelumSelesai.addEventListener('click', function(){
    console.log('buku ditandai belum selesai!')
})



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

    console.log(books)
    localStorage.setItem()


    // membersihkan form
    inputBookTitle.value = ''
    inputBookAuthor.value = ''
    inputBookYear.value = ''
    inputBookIsComplete.checked = false 


    // alert terimakasih
    alert('terimakasih telah mengisi formulir!')

    // console.log(`${id} ${judul} ${penulis} ${tahun} ${isComplete}`)
})

//mengecek apakah support local storage atau tidak
function isStorageExist() {
    if (typeof Storage === undefined) {
      alert("Maaf browser anda tidak support local storage");
      return false;
    }
  
    return true;
}


// saving books to local storage
function saveData(){
    if(isStorageExist()){
        const parsedBook = JSON.stringify(books)
        localStorage.setItem(localStorageKey, parsedBook)
    }
}



