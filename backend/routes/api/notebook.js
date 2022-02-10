const express = require('express')
const asyncHandler = require('express-async-handler');
const {handleValidationErrors} = require('../../utils/validation');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Notebook, User } = require('../../db/models')

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

module.exports = router;
