const express = require('express');
const controller = require('../controllers/tradeController')

const router = express.Router();

// GET /trades: send all trades to the user
router.get('/', controller.index);

// GET /trades/new: send html for for creating a new trade

router.get('/new', controller.new);

// POST /trades/: create a new trade

router.post('/', controller.create);

// GET /trades/:id: send details of a trades identified by id

router.get('/:id', controller.show);

// GET /trades/:id/edit: send html form for editing a trade

router.get('/:id/edit', controller.edit);

// PUT /stories/:id/edit: update the trade identified by id

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports = router;