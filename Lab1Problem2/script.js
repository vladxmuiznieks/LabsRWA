//Referencing elements
const mainContainer = document.getElementById("mainContainer");
const addNoteBtn = mainContainer.querySelector(".btn-add");
const infoBtn = document.getElementById("info");
const infoBtn2 = document.getElementById("info2");

// Buttons to trigger tips to pop up as alert
infoBtn.addEventListener("click", function(){
    alert("To add a note click + button. To delete a note double click on it. To edit a note click into it and back out of it!");
});

infoBtn2.addEventListener("click", function(){
    alert("Select a colour here to change the colour of the note before adding it!");
});


getNotes().forEach(function(note){
    const noteElement = createNote(note.id, note.content);
    mainContainer.insertBefore(noteElement, addNoteBtn);
});

addNoteBtn.addEventListener("click", () => {
    addNote()
});

//Retrieve existing notes from local storage
function getNotes(){
    //returns an empty array if there are no notes in local storage
    return JSON.parse(localStorage.getItem("stickies") || "[]" );

}


// creates the html for a note
function createNote(id, content){
    const newNote = document.createElement("textarea");

    newNote.value = content;
    newNote.classList.add("note-text");

    newNote.addEventListener("change", function(){
        editNote(id, newNote.value);
    });

    newNote.addEventListener("dblclick", function(){
        deleteNote(id, newNote);
    });

    var color = document.getElementById("colors").value;

    newNote.style.backgroundColor = color;
    return newNote;
}

// adding a new note to the local storage
function addNote(){
   const allNotes = getNotes();

    const noteJson = {
        id: Math.floor(Math.random() * 1000000),
        content: ""
    };

    const noteElement = createNote(noteJson.id, noteJson.content);
    mainContainer.insertBefore(noteElement, addNoteBtn);

    allNotes.push(noteJson);
    saveNotes(allNotes);
}

function deleteNote(id, newNote) {
    const allNotes = getNotes().filter(note => note.id !== id);

    saveNotes(allNotes);
    mainContainer.removeChild(newNote);

}

// edits an existing note
function editNote(id, editContent){
    const allNotes = getNotes();
    const noteIndex = allNotes.findIndex(function(note){
        return note.id === id;
    });

    allNotes[noteIndex].content = editContent;
    saveNotes(allNotes);

}

// Save new notes to local storage and assign key + pass through list of notes
function saveNotes(notes){
    localStorage.setItem("stickies", JSON.stringify(notes)) ;

}