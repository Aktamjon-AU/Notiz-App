const notesListEl = document.querySelector(".notes-list");
const saveButtonEl = document.querySelector(".save-note");
const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const getNewNotes = document.querySelector(".create-new");
const deleteButtonEl = document.querySelector(".delete-note");

saveButtonEl.addEventListener("click", saveNewNotes);
getNewNotes.addEventListener("click", newNotes);
deleteButtonEl.addEventListener("click", deleteNotesButton);

displayNotesList();
noteListener();

function noteListener() {
  const noteEntriesEl = document.querySelectorAll(".note-entry");
  noteEntriesEl.forEach((noteEntry) => {
    noteEntry.addEventListener("click", () =>
      selectNote(noteEntry.getAttribute("data-id")),
    );
  });
}

function displayNotesList() {
  const notes = getNotes();

  const sortedNotes = notes.sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated,
  );

  let html = "";

  sortedNotes.forEach((note) => {
    html += `<div class="note-entry" data-id = "${note.id}">
            <div class="note-title">${escapeHtml(note.title)}</div>
            <div class="note-content-teaser">${escapeHtml(note.content)}</div>
            <div class="note-data">${new Date(note.lastUpdated).toLocaleString("de-DE")}</div>
          </div>
        `;
  });

  notesListEl.innerHTML = html;
}

function saveNewNotes() {
  const title = titleInput.value;
  const content = contentInput.value;

  if (!content || !title) {
    alert("Bitte Titel und Inhalt eingeben");
    return;
  }

  saveNotes(title, content, Number(getCurrentId()));
  displayNotesList();
  titleInput.value = "";
  contentInput.value = "";
  displayNotesList();
  noteListener();
}

function deleteNotesButton() {
  const currentlySelectedId = getCurrentId();

  if (!currentlySelectedId) return;

  deleteNotes(currentlySelectedId);

  titleInput.value = "";
  contentInput.value = "";

  displayNotesList();
  noteListener();
}

function selectNote(id) {
  const selectedNoteEl = document.querySelector(
    `.note-entry[data-id = "${id}"]`,
  );

  if (selectedNoteEl.classList.contains("selected-note")) return;
  removeAllIds();

  selectedNoteEl.classList.add("selected-note");

  const notes = getNotes();

  const selectedNote = notes.find((note) => note.id === Number(id));
  if (!selectedNote) return;

  titleInput.value = selectedNote.title;
  contentInput.value = selectedNote.content;
}

function newNotes() {
  titleInput.value = "";
  contentInput.value = "";
  removeAllIds();
}

function removeAllIds() {
  const noteEntriesEl = document.querySelectorAll(".note-entry");
  noteEntriesEl.forEach((noteEntry) => {
    noteEntry.classList.remove("selected-note");
  });
}

function getCurrentId() {
  let currentId = undefined;

  const currentNoteEl = document.querySelector(".selected-note");

  if (currentNoteEl) {
    currentId = currentNoteEl.getAttribute("data-id");
  }
  return currentId;
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
