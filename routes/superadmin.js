
var express = require('express');
var router = express.Router();
var empresa = require('../controller/administrador')
var verificaLoginAdm = require('../middlewares/authAdmin')
var superAdm = require('../middlewares/authAdmin')

const multer = require('multer')

const uploads = multer({
    dest: 'public/uploads/'
})  


router.get('/', verificaLoginAdm, empresa.administrador)
router.get('/loginempresa', empresa.loginEmpresa)
router.post('/loginempresa', empresa.loginEmpresaPost)
router.get('/produtos',verificaLoginAdm, empresa.produtosAdmin)
router.get('/produtos/criar', verificaLoginAdm,  empresa.criarProdutosAdmin)
router.post('/produtos/criar', verificaLoginAdm,  uploads.single('imagemProduto'), empresa.criarProdutoAdminPost)
router.get('/produtos/:idProduto/edit',verificaLoginAdm, empresa.produtoEditId)
router.get('/produtos/:idProduto', verificaLoginAdm, empresa.verProuto)
router.post('/produtos/:idProduto/edit', verificaLoginAdm, uploads.single('imagemProduto'), empresa.editProdutoId)
router.get('/produtos/:idProduto/remover', verificaLoginAdm, empresa.removerProdutoAdmin)
router.get('/categorias',verificaLoginAdm, empresa.categoriaAdmin)
router.get('/categorias/criar',verificaLoginAdm, empresa.categoriaCriar)
router.post('/categorias/criar',verificaLoginAdm,uploads.single('imagemCategoria'), empresa.categoriaCriarPost)
router.get('/categorias/:idCategoria/edit', verificaLoginAdm, empresa.categoriaEditId)
router.post('/categorias/:idCategoria/edit',verificaLoginAdm,empresa.categoriaEditPost)
router.get('/categorias/:idCategoria', verificaLoginAdm, empresa.categoriaId)
router.get('/categorias/:idCategoria/remove',verificaLoginAdm, empresa.categoriaRemoveId)




module.exports = router