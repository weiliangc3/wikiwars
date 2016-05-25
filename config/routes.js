var express = require('express');
var router  = express.Router();

var gamesController = require('../controllers/gamesController');

router.route('/')
  .get(gamesController.gamesIndex);

router.route('/games')
  .get(gamesController.gamesIndex)
  .post(gamesController.gamesCreate);

router.route('/games/:id')
  .get(gamesController.gamesShow)
  .put(gamesController.gamesUpdate)
  .delete(gamesController.gamesDelete);

module.exports = router;
