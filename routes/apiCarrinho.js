var express = require('express');
var router = express.Router();
const { Usuario, Produto, UsuarioComum} = require('../models')
var api = require('../controller/apiController') 

var verificaLogin = require('../middlewares/authLogin')


router.get('/produtos', api.index)
router.get('/cep', api.cep)


module.exports = router
