var express = require('express');
var router = express.Router();
const { Usuario, Produto, UsuarioComum} = require('../models')
var usuario = require('../controller/usuarioControl') 

var verificaLogin = require('../middlewares/authLogin')


router.get('/', usuario.index)
router.get('/login', usuario.login)
router.post('/login', usuario.loginPost)
router.get('/logout', usuario.logout)
router.get('/contato', usuario.contato)
router.get('produtos', usuario.produtoUsuario)
router.get('/produtos/:idProduto', usuario.produtoUsuarioId)
router.get('/cadastro', usuario.cadastro)
router.post('/cadastro', usuario.cadastroPost)
router.get('/cep', usuario.cep)
router.post('/cep', usuario.cepPost)
router.get('/admin',verificaLogin, usuario.admin)


module.exports = router;