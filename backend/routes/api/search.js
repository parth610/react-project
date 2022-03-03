const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const {Note, Notebook} = require('../../db/models');

const router = express.Router();

router.get('/note', requireAuth, asyncHandler(async(req, res, next) => {
    const {searchValues} = req.body;
    const currUser = req.user.dataValues.id;
    const foundNotes = await Note.findAll({
        where: {title: {[Op.iRegexp]: `[\s\S]*${searchValues}.*`}, userId: currUser}
    })
    return res.json(foundNotes)
}))

router.get('/notebook', requireAuth, asyncHandler(async(req, res, next) => {
    const {searchValues} = req.body;
    const currUser = req.user.dataValues.id;
    const foundNotebooks = await Notebook.findAll({
        where: {title: {[Op.iRegexp]: `[\s\S]*${searchValues}.*`}, userId: currUser}
    })
    return res.json(foundNotebooks)
}))


module.exports = router;
