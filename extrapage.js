const myNotes = [];

const LOCAL_STORAGE_KEY = "notizapp-notizen";

if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myNotes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function deleteNotes(id) {
  if (!id) return;

  const notes = getNotes();

  const filteredNotes = notes.filter((note) => note.id !== Number(id));

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredNotes));
}

function chooseNotes() {
  const notes = getNotes();

  const sortedNotes = notes.sort((noteA, noteB) => noteA.id - noteB.id);

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId === note.id) {
      nextId++;
    } else if (note.id > nextId) {
      break;
    }
  }
  return nextId;
}

function saveNotes(title, content, id = undefined) {
  const notes = getNotes();

  if (!id) {
    notes.push({
      title,
      content,
      id: chooseNotes(),
      lastUpdated: new Date().getTime(),
    });
  } else {
    const indexNoteId = notes.findIndex((note) => note.id === id);

    if (indexNoteId > -1) {
      notes[indexNoteId] = {
        title,
        content,
        id,
        lastUpdated: new Date().getTime(),
      };
    }
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}
