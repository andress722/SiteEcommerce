var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const bodyParser = require('body-parser')
const { Usuario, Produto} = require('../models')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const obj = {
    produtos: await Produto.findAll()
  }
  res.render('index', obj);
});


router.get('/contato', function(req,res,next){
  res. render('contato')
})

router.get('/login', function(req,res,next){
  res.render('login')
})


function middlewareContato(req, res,next){
  console.log('Rodando middle do /contato')
  next()
}


module.exports = router;
