const router = require('express').Router();
const sessionRouter = require('./session.js');
const userRouter = require('./users.js');
const notebookRouter = require('./notebook.js')

const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use('/session', sessionRouter);
router.use('/users', userRouter);
router.use('/notebook', notebookRouter);

router.post('/test', (req, res) => {
    res.json({requestBody: req.body});
});

module.exports = router;
