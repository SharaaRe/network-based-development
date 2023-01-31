const express = require('express');
const controller = require('../controllers/tradeController')
const {isAuthenticated} = require('../middlewares/auth');
const {isAuthor} = require('../middlewares/auth');
const {validateid, validateTrade, validateResult} = require('../middlewares/validator');

const router = express.Router();

// GET /trades: send all trades to the user
router.get('/', controller.index);

// GET /trades/new: send html for for creating a new trade

router.get('/new', isAuthenticated, controller.new);

// POST /trades/: create a new trade

router.post('/', isAuthenticated, validateTrade, validateResult, controller.create);

// GET /trades/:id: send details of a trades identified by id

router.get('/:id', validateid, controller.show);

// GET /trades/:id/edit: send html form for editing a trade

router.get('/:id/edit',validateid, isAuthenticated, isAuthor,  controller.edit);

// PUT /trades/:id/edit: update the trade identified by id

router.put('/:id', isAuthenticated, validateid, isAuthor,validateTrade, validateResult, controller.update);

router.delete('/:id', validateid, isAuthor, controller.delete);

//POST /trades/:id/watchlist 

router.post('/:id/watchlist', validateid, isAuthenticated, controller.watchlist);

router.delete('/:id/watchlist', validateid, isAuthenticated, controller.deleteFromWatchlist);



module.exports = router;