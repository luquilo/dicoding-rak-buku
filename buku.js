const localStorageKey = 'books'

let books = []
const inputBookForm = document.getElementById('inputBook')
const deleteBook1 = document.querySelector('#deleteBook')
const deleteBook2 = document.querySelector('#deleteBook2')
const tandaiSelesai = document.getElementById('tandaiSelesai')
const tandaiBelumSelesai = document.getElementById('tandaiBelumSelesai')

// menghapus semua local storage
function clearLocalStorage() {
    localStorage.clear();
}

// function menghapus buku dari rak belum selesai
deleteBook1.addEventListener('click', function(){
    console.log('buku dihapus!')
})

// function menghapus buku dari rak selesai
deleteBook2.addEventListener('click', function(){
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

//mengecek apakah support local storage atau tidak
function isStorageExist() {
    if (typeof Storage === undefined) {
      alert("Maaf browser anda tidak support local storage");
      return false;
    }
  
    return true;
}

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

    console.log(books)


    // saving books to local storage
    function saveDataToLocalStorage() {}{
    if(isStorageExist()){
        const parsedBook = JSON.stringify(books)
        localStorage.setItem(localStorageKey, parsedBook)
    }

    saveDataToLocalStorage()
}


    // membersihkan form
    inputBookTitle.value = ''
    inputBookAuthor.value = ''
    inputBookYear.value = ''
    inputBookIsComplete.checked = false 





    // alert terimakasih
    alert('terimakasih telah mengisi formulir!')

    // console.log(`${id} ${judul} ${penulis} ${tahun} ${isComplete}`)
})





