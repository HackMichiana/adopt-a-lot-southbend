var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Adopt-A-Lot South Bend' });
});

router.get('/volunteer/claim', require('../controllers').volunteer.claim.get);

module.exports = router;
