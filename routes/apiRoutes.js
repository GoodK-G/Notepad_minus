const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Read notes from the database
router.get('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  res.json(notes);
});

// Save a new note to the database
router.post('/notes', (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  newNote.id = notes.length.toString();
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2));
  res.json(newNote);
});

// Update an existing note
router.put('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const updatedNote = req.body;
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  
    // Find the index of the note with the given id
    const noteIndex = notes.findIndex(note => note.id === noteId);
  
    if (noteIndex !== -1) {
      // Update the note
      notes[noteIndex] = { ...notes[noteIndex], ...updatedNote };
      fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2));
      res.json(notes[noteIndex]);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  });
  
  // Delete an existing note
  router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  
    // Filter out the note with the given id
    notes = notes.filter(note => note.id !== noteId);
  
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2));
    res.json({ message: 'Note deleted successfully' });
  });
  



module.exports = router;
