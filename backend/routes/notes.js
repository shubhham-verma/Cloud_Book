const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');


// !! ROUTE : 1 Fetching all notes of a user using GET : "/api/notes/fetch_notes". Login required
router.get('/fetch_notes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error ocurred');
    }
});

// !! ROUTE : 2 Adding notes of user using POST : "/api/notes/add_notes". Login required
router.post('/add_notes', [
    body('title', 'Title must not be empty').notEmpty(),
], fetchuser, async (req, res) => {
    // if any errors found, return bad requests and returns those errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        });

        const saved_note = await note.save();
        res.json(saved_note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error ocurred');
    }
});

// !! ROUTE : 3 Updating notes of user using POST : "/api/notes/update_notes/:id". Login required
router.put('/update_notes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // create a new node to store provided information
        let new_note = {};
        if (title) { new_note.title = title };
        if (description) { new_note.description = description };
        if (tag) { new_note.tag = tag };

        // find if the note to update exists
        let note = await Notes.findById(req.params.id);

        if (!note) { return res.status(404).send("Not Found"); }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed"); }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: new_note }, { new: true });
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// !! ROUTE : 4 Deleting notes of user using DELETE : "/api/notes/delete_notes/:id". Login required
router.delete('/delete_notes/:id', fetchuser, async (req, res) => {

    try {
        // find if the note to delete exists
        let note = await Notes.findById(req.params.id);

        if (!note) { return res.status(404).send("Not Found"); }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed"); }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted" ,note: note });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
