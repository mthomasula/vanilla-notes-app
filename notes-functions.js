

// Read existing notes form local storage 
const getSavedNotes = function() {
    const notesJSON = localStorage.getItem('notes')

if (notesJSON !== null) {
    return JSON.parse(notesJSON)
    }   else {
    return []
    }

}

// Remove note from the list 
const removeNote = function(id) {
    const noteIndex = notes.findIndex(function (note) {
        return note.id === id
    })

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}



// Generate DOM structure for note
const generateNoteDOM = function(note) {
    const noteEl = document.createElement('div')    //noteEl is where the text and the button live
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    //Setup the remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click', function(){
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    // Setup the note title text, if no title is provided by user, set textContent 'Unnamed Note'
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed Note'
    }

    textEl.setAttribute('href', `edit.html#${note.id}`)
    noteEl.appendChild(textEl)

    return noteEl
}


// Render application notes 
const renderNotes = function (notes, filters) {
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
// Clears the notes div so that it doesn't repeat all the notes
    document.querySelector('#notes').innerHTML = ''
// filteredNotes has all the notes if no filter is specified
    filteredNotes.forEach(function (note) {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}


// Save notes to local storage 
const saveNotes = function (notes){
    localStorage.setItem('notes', JSON.stringify(notes))
}


const generateLastEdited = function (timestamp) {
   return `last edited ${moment(timestamp).fromNow()}`
}