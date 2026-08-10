# Notebook — Notes App

Week 1 Task submission for the **Syntecxhub Web Development Internship**.

A simple, responsive notes application where you can add, edit, and delete notes. Notes are saved to `localStorage`, so they persist even after closing the browser.

## Features

- Add new notes instantly
- Edit notes inline
- Delete notes
- Notes persist across sessions using `localStorage`
- Input stays focused after adding a note (`useRef`)
- Clean, card-based "pinboard" UI

## Tech Stack

- React (Vite)
- Plain CSS (no framework)

## React Concepts Used

| Hook | Where it's used |
|---|---|
| `useState` | Managing the notes list, the input draft, and edit state |
| `useRef` | Keeping focus on the note input field |
| `useEffect` | Loading/saving notes to `localStorage` and auto-focusing input |

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build
```

## Project Structure

```
Syntecxhub_NotesApp/
├── src/
│   ├── App.jsx      # Main component with all notes logic
│   ├── App.css       # Styling
│   └── main.jsx      # React entry point
├── index.html
├── package.json
└── vite.config.js
```

---
Built as part of the Syntecxhub Internship Program.
