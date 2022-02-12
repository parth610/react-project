const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Note } = require('../../db/models')

const router = express.Router();

router.post('/', requireAuth, asyncHandler(async(req, res, next) => {
    const {title, content, notebook_id} = req.body;

    const newNote = await Note.create({title, user_id: req.user.dataValues.id, notebook_id, content })
    res.json(newNote)
}))

router.get('/all', requireAuth, asyncHandler(async(req, res, next) => {
    const currUser = req.user.dataValues.id;
    const notes = await Note.findAll({
        where: {user_id: currUser}
    })
    return res.json(notes);
}))

router.delete('/:id', requireAuth, asyncHandler(async(req, res, next) => {
    const currUser = req.user.dataValues.id;
    const noteId = req.params.id;
    const note = await Note.findByPk(noteId);
    if (note && note.user_id === currUser) {
        await note.destroy();
    }
    res.json(note)
}))

router.put('/:id', requireAuth, asyncHandler(async(req, res) => {
    const {title, content} = req.body;
    const currUser = req.user.dataValues.id;
    const id = req.params.id;
    const updateNote = await Note.findByPk(id);
    if (updateNote && updateNote.user_id === currUser) {
        updateNote.title = title;
        updateNote.content = content;
        await updateNote.save();
    }
    res.json(updateNote)
}))

module.exports = router;
