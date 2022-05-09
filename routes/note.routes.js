const express = require('express')
const router = express.Router()
const noteController = require('../controllers/note.controller');

// Retrieve all notes
router.get('/', noteController.findAll);

// Create a new note
router.post('/', noteController.create);

// Retrieve a single note with id
router.get('/:id', noteController.findById);

// Update a note with id
router.put('/:id', noteController.update);

// Delete a note with id
router.delete('/:id', noteController.delete);

module.exports = router
