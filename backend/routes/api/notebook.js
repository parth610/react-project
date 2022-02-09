const express = require('express')
const asyncHandler = require('express-async-handler');
const {handleValidationErrors} = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

router.post('/', requireAuth, asyncHandler(async(req, res, next) => {
    const {title} = req.body;
    console.log(res.locals.user.id)
    res.json({title})
}))

module.exports = router;
