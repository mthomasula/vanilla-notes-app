const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)
const dateElement = document.querySelector('#last-edited')

// Pull the notes from storage to be used in the remained of this file
let notes = getSavedNotes()

let note = notes.find(function (note) {
    //if the note id property matches the noteId pulled from the URL, return true and nothing happens
    return note.id === noteId
})

    //if the note is undefined, return to home page
if (note === undefined) {
    location.assign('index.html')
}


titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener('input',  function (e) {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input',  function (e) {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click',  function (e) {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('index.html')
    
})

// storage fires when any data in local storage is changed
window.addEventListener('storage',  function (e) {
    if (e.key === 'notes') {
       notes = JSON.parse(e.newValue)
       
       note = notes.find(function (note) {
        //if the note id property matches the noteId pulled from the URL, return true and nothing happens
        return note.id === noteId
    })
    
        //if the note is undefined, return to home page
    if (note === undefined) {
        location.assign('index.html')
    }
    
    
    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)
    }
    
})