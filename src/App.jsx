import { useState, useRef, useEffect } from 'react'

// Colors cycle across notes so the board doesn't look flat
const NOTE_COLORS = ['note-mustard', 'note-sage', 'note-rose', 'note-sky']
const STORAGE_KEY = 'syntecxhub_notes'

function formatDate(timestamp) {
  const d = new Date(timestamp)
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function App() {
  // Load notes from localStorage once, on first render
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const inputRef = useRef(null)

  // Persist to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  // Keep focus on the input after adding a note
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleAdd(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return

    const newNote = {
      id: crypto.randomUUID(),
      text,
      createdAt: Date.now(),
    }

    setNotes((prev) => [newNote, ...prev])
    setDraft('')
    inputRef.current?.focus()
  }

  function handleDelete(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  function startEditing(note) {
    setEditingId(note.id)
    setEditingText(note.text)
  }

  function cancelEditing() {
    setEditingId(null)
    setEditingText('')
  }

  function saveEdit(id) {
    const text = editingText.trim()
    if (!text) {
      handleDelete(id)
    } else {
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? { ...note, text } : note))
      )
    }
    cancelEditing()
  }

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Syntecxhub · Week 1 Task</p>
        <h1>Notebook</h1>
        <p className="subtitle">A place to pin down whatever's on your mind.</p>
      </header>

      <form className="composer" onSubmit={handleAdd}>
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a new note…"
          aria-label="New note text"
        />
        <button type="submit">Pin note</button>
      </form>

      {notes.length === 0 ? (
        <div className="empty-state">
          <p>Your board is empty. Add your first note above.</p>
        </div>
      ) : (
        <div className="board">
          {notes.map((note, index) => {
            const colorClass = NOTE_COLORS[index % NOTE_COLORS.length]
            const isEditing = editingId === note.id

            return (
              <div className={`note ${colorClass}`} key={note.id}>
                <span className="pin" aria-hidden="true" />
                {isEditing ? (
                  <>
                    <textarea
                      className="note-edit"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      autoFocus
                    />
                    <div className="note-actions">
                      <button className="link-btn" onClick={() => saveEdit(note.id)}>
                        Save
                      </button>
                      <button className="link-btn" onClick={cancelEditing}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="note-text">{note.text}</p>
                    <div className="note-footer">
                      <span className="note-date">{formatDate(note.createdAt)}</span>
                      <div className="note-actions">
                        <button className="link-btn" onClick={() => startEditing(note)}>
                          Edit
                        </button>
                        <button className="link-btn" onClick={() => handleDelete(note.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
