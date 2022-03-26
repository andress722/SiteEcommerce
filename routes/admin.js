const express = require('express')
const router = express.Router()
const multer = require('multer')
//const ModelControllerBrand = require('../models/brand')
const res = require('express/lib/response');
const { Usuario, Produto} = require('../models')



//--- Multer IMAGEM --- //

const uploads = multer({
    dest: 'public/uploads/'
})

//--- LOGIN --- //

function verificaLogin(req,res,next){
    
    if(!req.session.estaLogado){
        res.redirect('/login')
        return
    }
    next()
}

router.use(verificaLogin)



//--- CONTROLE ADMIN --- //

router.get('/', function(req,res){
    res.render('controle-admin')
})


//--- BRAND --- //

/*router.get('/brand', function(req,res){
    const obj = {
        roupas: ModelControllerBrand.listaProdutos()
    }
    res.render('brand/brand-admin', obj)
})

router.get('/brand/criar', function(req,res){
    res.render('brand/form-brand')
})


function validaCadastrodeProduto(req, res, next){

    if (!req.body.nome || !req.body.descricao || !req.body.valor ){
        res.render('form-servico-erro', { mensagemErro: 'Preencha todos os campos'})
        return
    }

    if (req.body.nome.length <= 3){
        res.render('form-servico-erro', { mensagemErro: 'Campo nome tem que ser maior do que 3'})
        return
    }


    if (req.body.descricao.length <= 10){
        res.render('form-servico-erro', { mensagemErro: 'Descrição deve ter mais de 10 caracteres'})
        return
    }

    if (isNaN(req.body.valor)){
        res.render('form-servico-erro', { mensagemErro: 'Valor deve ser um numero'})
        return
    }
    next()
}

router.post('/brand/criar', uploads.single('imagemServico'),  validaCadastrodeProduto, function(req,res){
    console.log(req.body)

    req.body.imagem =  req.file.filename

    ModelControllerBrand.adicionaProduto(req.body)

    res.render('enviado')
})

router.get('/brand/:idBrand/remover', function(req,res){
    console.log('removendo Brand')

    const idBrand = req.params.idBrand

    ModelControllerBrand.removeProdutoViaId(idBrand)

    res.redirect('/admin/brand')
})

router.get('/brand/:idBrand/editar', function(req,res){

    const idBrand = req.params.idBrand

    const roupas = ModelControllerBrand.buscaProdutoViaId(idBrand)

    const obj = {
        roupas: roupas
    }   

    res.render('brand/form-brand-edit', obj)
})

router.post('/brand/:idBrand/editar', function(req,res){

    const idBrand = req.params.idBrand
    ModelControllerBrand.alteraProdutoViaId(idBrand, req.body)
    res.redirect('/admin/brand')
})

//--- TI --- //


router.get('/ti', function(req,res){
    const obj = {
        ti: modelControllerTi.listaTi()
    }
    res.render('ti/admin-ti', obj)
})


router.get('/ti/criar', function(req,res){
    res.render('ti/form-ti')
})

router.post('/ti/criar',uploads.single('imagemServico'), function(req,res){
    modelControllerTi.adicionaTi(req.body)
    res.render('enviado')
})

router.get('/ti/:idTi/remover', function(req,res){
    console.log('removendo TI')

    const idTi = req.params.idTi

    modelControllerTi.removendoTiViaId(idTi)

    res.redirect('/admin/ti')
})

router.get('/ti/:idTi/editar', function(req,res){

    const idTi = req.params.idTi

    const tis = modelControllerTi.buscaTiViaId(idTi)

    const obj = {
        tis: tis
    }
    res.render('ti/form-ti-edit', obj)
})

router.post('/ti/:idTi/editar', function(req,res){
    console.log('TI editado')

    const idTi = req.params.idTi

    console.log(req.body)

    modelControllerTi.alteraTiviaId(idTi,req.body)

    res.redirect('/admin/ti')

})
*/

//--- PRODUTOS/CALÇAS --- //

router.get('/produtos', async function(req, res){
    

    const obj = {
        calca: await Produto.findAll()
    }
    res.render('produtos/admin-produtos', obj)
})

router.get('/produtos/criar', async function(req,res){
    const categorias = await Categorias.findAll()

    res.render('produtos/form-produtos', {categorias: categorias})
})

router.post('/produtos/criar', uploads.single('imagemServico'), async function(req,res){

    req.body.imagem =  req.file.filename
    
    await Produto.create(req.body) 

    res.render('enviado')

})

router.get('/produtos/:idProduto/remover', function(req,res){
    console.log('removendo produto')

    const idProduto = req.params.idProduto

    modelControllerCalca.removeCalcaViaId(idProduto)

    res.redirect('/admin/produtos')
})  


router.get('/produtos/:idProduto/edit', async function(req,res){


    const idProduto = req.params.idProduto
    const calcas = await Produto.findByPk(idProduto)

        const obj = {
        calcas: calcas
    }
    res.render('produtos/editar-produto',obj)
})


router.post('/produtos/:idProduto/edit', function(req,res){

    const idProduto = req.params.idProduto

    console.log(req.body)

    modelControllerCalca.alteraCalcaViaId(idProduto, req.body)

    res.redirect('/admin/produtos')
})

router.get('/login', function(req,res){
    res.render('login')
  })
  
  
  router.post('/login', function(req,res){
    const usuarioLogin = modelUsuarios.buscaUsuarioViaEmail(req.body.email)
    console.log(usuarioLogin)
    if(usuarioLogin.senha == req.body.senha){
        req.session.estaLogado = true
        res.redirect('/admin')
    }else{
        res.render('form-servico-erro', { mensagemErro: 'Senha Invalida'})
    }
  })

module.exports = router