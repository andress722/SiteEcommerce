var express = require('express');
var router = express.Router();
var pedidos = require('../controller/pedidoController')

var verificaLogin = require('../middlewares/authLogin')

const multer = require('multer')


router.get('/', pedidos.index)
router.get('/adiciona/:idProduto', pedidos.adiciona)
router.get('/adiciona/:idProdutos/post', pedidos.adicionaPost)
router.get('/vercarrinho', pedidos.verCarrinho)  
router.get('/detalhes-pedido', pedidos.detalhePedido)
router.post('/detalhes-pedido/',pedidos.enviarPedido)


module.exports = router