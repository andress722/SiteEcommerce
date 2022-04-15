const express = require('express')
const router = express.Router()
const multer = require('multer')
//const ModelControllerBrand = require('../models/brand')
const res = require('express/lib/response');
const { Usuario, Produto, Categoria, ProdutoFavoritoUsuario} = require('../models')



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





//validação de Cadastro de Produtos//

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


//--- CONTROLE ADMIN --- //

router.get('/', function(req,res){
    res.render('controle-admin')
})


router.get('/produtos', async function(req, res){
    
    const obj = {
        calca: await Produto.findAll()
    }
    res.render('produtos/admin-produtos', obj)
})

router.get('/produtos/criar', async function(req,res){
    const obj = {
        categorias: await Categoria.findAll()
    }

    res.render('produtos/form-produtos',obj)
})

router.post('/produtos/criar', uploads.single('imagemServico'), async function(req,res){

    req.body.imagem =  req?.file?.filename
    
    await Produto.create(req.body) 

    res.render('enviado')

})

router.get('/produtos/:idProduto/remover', async function(req,res){
    console.log('removendo produto')

    const idProduto = req.params.idProduto
    await Produto.destroy({
        where: {
            id: idProduto
        }
         
    })

    res.redirect('/admin/produtos')
})  


router.get('/produtos/:idProduto/edit', async function(req,res){

    const idProduto = req.params.idProduto
  const produto = await Produto.findByPk(idProduto, {
    include: {
      model: Categoria,
      as: 'categoria'
    }
  })

  if(!produto) {
    res.render('erro-validacao', { mensagemErro: 'Produto não existe' })
    return
  }

  const obj = {
    produto: produto
  }

  res.render('produtos/editar-produto', obj)
})

router.post('/produtos/:idProduto/editar', async function(req, res) {

  const idProduto = req.params.idProduto

  await Produto.update(req.body, {
    where: {
      id: idProduto
    }
  })
 res.redirect('admin/produtos')
})


router.post('/produtos/:idProduto/edit', async function(req,res){

    const idProduto = req.params.idProduto

    await Produto.update(req.body, {
        where: {
            id: idProduto
        }
         
    })

    res.redirect('/admin/produtos')
})




router.get('/categoria', async function(req,res){
    const obj = {
        categorias: await Categoria.findAll()
      }
    res.render('categorias/admin-categorias',obj)
})


router.get('/categoria/criar', async function(req,res){

    res.render('categorias/form-categorias')
})


router.post('/categoria/criar', async function(req,res){
    await Categoria.create(req.body)
    console.log(req.body)
    res.redirect('/admin/categoria')
})

router.get('/categoria/:idCategoria', async function(req,res){
    const idCategoria = req.params.idCategoria
    const obj = {
      categorias: await Categoria.findByPk(idCategoria, {
        include: {
          model: Produto,
          as: 'produtos'
        }
      })
    }
    res.render('categorias/ver-categoria', obj)
})

router.get('/categoria/:idCategoria/edit', async function(req,res){
    const idCategoria = req.params.idCategoria
    try{
        const produto = await Categoria.findByPk(idCategoria )
        const obj = {
            produto:produto
         }

    res.render('categorias/editar-categorias',obj)

    }catch (error){
        res.render('categorias/editar-categorias',obj)
    }
    
})

router.get('/categoria/:idCategoria/remover', async function(req,res){
    const idCategoria = req.params.idCategoria
    await Categoria.destroy({
        where: {
            id: idCategoria
        }
         
    })
    res.redirect('/admin/categoria')
})


router.get('/favoritos', async function(req,res){

    const usuario = await Usuario.findByPk(req.session.usuarioLogado.id, {
        include:{
            model: Produto,
            as: 'favoritos'
        }
    })
    console.log(usuario.favoritos)
    console.log(usuario)
    res.render('favoritos', {
        favoritos: usuario.favoritos,
        usuario: req.session.usuarioLogado.id
    })
  })

  router.get('/produtos/:idProdutos/favoritar', async function(req, res){
      const idProdutos = req.params.idProdutos
      const idUsuario = req.session.usuarioLogado.id
      try {
        await ProdutoFavoritoUsuario.create({
            produto_id: idProdutos,
            usuario_id: idUsuario
        })
        res.redirect('/admin/favoritos')
      } catch (error) {
        console.log(error) 
        res.redirect('/admin/favoritos')
      }  

 })


    router.get('/favoritos/:idProdutos/remover', async function(req, res){
        const idProdutos = req.params.idProdutos
        const idUsuario = req.session.usuarioLogado.id
        
        await ProdutoFavoritoUsuario.destroy({
            where: {
                produto_id: idProdutos,
                usuario_id: idUsuario
            }

        })

        res.redirect('/admin/favoritos')
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

module.exports = router 