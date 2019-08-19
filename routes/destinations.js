var express = require('express');
var router = express.Router();
var destinationsCtrl = require('../controllers/flights');

router.get('/', destinationsCtrl.index);
router.get('/new', destinationsCtrl.new);
router.get('/:id', destinationsCtrl.show);
router.post('/', destinationsCtrl.create);
router.post('/flights/:id/destinations', destinationsCtrl.create);

module.exports = router;