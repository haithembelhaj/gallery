var express = require('express');
var router = express.Router();

/**
 * return the index.html
 * this is the only route we need to render
 */
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
