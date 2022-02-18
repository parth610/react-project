const express = require('express')
const asyncHandler = require('express-async-handler');
const {handleValidationErrors} = require('../../utils/validation');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Notebook, User, Note } = require('../../db/models')

const router = express.Router();

router.post('/', requireAuth, asyncHandler(async(req, res, next) => {
    const {title} = req.body;
    const newNotebook = await Notebook.create({title, user_id: req.user.dataValues.id})
    res.json(newNotebook)
}))

router.get('/', requireAuth, asyncHandler(async(req, res, next) => {
    const currUser = req.user.dataValues.id;
    const notebooks = await Notebook.findAll({
        where: {user_id: currUser}
    })
    return res.json(notebooks)
}))

router.delete('/:id', requireAuth, asyncHandler(async(req, res, next) => {
    const currUser = req.user.dataValues.id;
    const notebookId = req.params.id;
    const notebook = await Notebook.findByPk(notebookId);
    if (notebook && notebook.user_id === currUser) {
        await notebook.destroy();
    }

    res.json(notebook)
}))

router.put('/:id', requireAuth, asyncHandler(async(req, res, next) => {
    const {title} = req.body;
    const currUser = req.user.dataValues.id;
    const id = req.params.id
    const updateBook = await Notebook.findByPk(id);
    if (updateBook && updateBook.user_id === currUser) {
        updateBook.title = title;
        await updateBook.save();
    }
    res.json(updateBook)
}))

router.get('/:id', requireAuth, asyncHandler(async(req, res, next) => {
    const currUser = req.user.dataValues.id;
    const notebookId = req.params.id;

    const notes = await Note.findAll({
        where: {user_id: currUser, notebook_id: notebookId}
    })
    return res.json(notes)
}))

module.exports = router;
