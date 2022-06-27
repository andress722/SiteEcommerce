var express = require('express');
var router = express.Router();
var pedidos = require('../controller/pedidoController')


const multer = require('multer')

router.get('/', pedidos.index)
router.get('/adiciona/:idProduto', pedidos.adiciona)
router.get('/adiciona/:idProdutos/post', pedidos.adicionaPost)
router.get('/vercarrinho', pedidos.vercarrinho)


module.exports = router