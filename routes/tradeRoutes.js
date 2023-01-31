const express = require('express');
const controller = require('../controllers/tradeController')
const {isAuthenticated} = require('../middlewares/auth');
const {isAuthor} = require('../middlewares/auth');
const {validateid} = require('../middlewares/validator');

const router = express.Router();

// GET /trades: send all trades to the user
router.get('/', controller.index);

// GET /trades/new: send html for for creating a new trade

router.get('/new', isAuthenticated, controller.new);

// POST /trades/: create a new trade

router.post('/', isAuthenticated, controller.create);

// GET /trades/:id: send details of a trades identified by id

router.get('/:id', validateid, controller.show);

// GET /trades/:id/edit: send html form for editing a trade

router.get('/:id/edit',isAuthenticated,  validateid, isAuthor,  controller.edit);

// PUT /stories/:id/edit: update the trade identified by id

router.put('/:id', isAuthenticated, validateid, isAuthor, controller.update);

router.delete('/:id', validateid, isAuthor, controller.delete);

module.exports = router;