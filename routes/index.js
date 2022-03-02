var express = require('express');
var router = express.Router();
var indexController = require('../controller/indexController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/contato', indexController.viewContato)
router.get('/confirmacontato', indexController.confirmaContato  )


module.exports = router;
