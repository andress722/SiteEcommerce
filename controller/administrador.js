var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const { Usuario, Produto, Categoria} = require('../models')
const multer = require('multer')
var superAdm = require('../middlewares/authAdmin')



const superadmin = {

      administrador: async function(req,res){
       
        try {
          const logado = req.session.usuarioLogado.id

          const obj =  {
            administrador: await Usuario.findByPk(logado)}
          return res.render('produtos/admin',obj)
          
        } catch (error) {
          console.log(error)
          return null
        }
      },



     loginEmpresa: function(req,res){
       if(req.query.fail)
        return res.render('form-servico-erro', {mensagemErro: 'erro no login'})
      else
        return res.render('login')
      },
      
      
      loginEmpresaPost: async function(req,res,next){
      
        try{
      
          const usuarioLogin = await Usuario.findOne({
            where: {
              email: req.body.email
            }
          })
          if(usuarioLogin && usuarioLogin.senha == req.body.senha){
              
            req.session.estaLogado = true
            req.session.usuarioLogado = usuarioLogin
              
              return res.redirect('/superadmin')
      
          }else{
             return  res.render('form-servico-erro', { mensagemErro: 'Senha Invalida'})
          }
        }catch (erro){
          next(erro)
        }
      },
       
    
    produtosAdmin: async function(req, res){
        const usuario = req.session.usuarioLogado.id
        const calca = await Produto.findAll()
        try{
            const obj = {
                calca: calca,
                usuario: await Usuario.findByPk(usuario),
            }
        console.log(calca)
        return res.render('produtos/admin-produtos', obj)
    }catch (error){
        return res.render('produtos/admin-produtos')
    }
    },

    verProuto: async(req,res)=> {
      
      const idProduto = req.params.idProduto
      const usuario = req.session.usuarioLogado.id
      const produto = await Produto.findByPk(idProduto, {
      include: {
        model: Categoria,
        as: 'categoria'
      }
    })
  
    if(!produto) {
      return res.render('erro-validacao', { mensagemErro: 'Produto não existe' })
      
    }
  
    const obj = {
      produto: produto,
      categorias: await Categoria.findAll(),
      usuario: await Usuario.findByPk(usuario)
    }
  
    return res.render('produtos/visualizar-produto-admin', obj)
  },
    
    criarProdutosAdmin: async function(req,res){
    
        const usuario = req.session.usuarioLogado.id
        const obj = {
            categorias: await Categoria.findAll(),
            usuario: await Usuario.findByPk(usuario)
        }
    
        return res.render('produtos/form-produtos',obj)
    },
    
    criarProdutoAdminPost: async function(req,res){
    
        req.body.imagem =  req?.file?.filename
        
        await Produto.create(req.body) 
    
        return res.render('enviado')
    
    },
    
    removerProdutoAdmin: async function(req,res){
        console.log('removendo produto')
    
        const idProduto = req.params.idProduto
        await Produto.destroy({
            where: {
                id: idProduto
            }
             
        })
    
        return res.redirect('/superadmin/produtos')
    },
    
    
        
    produtoEditId: async function(req,res){
    
        const idProduto = req.params.idProduto
        const usuario = req.session.usuarioLogado.id
        const produto = await Produto.findByPk(idProduto, {
        include: {
          model: Categoria,
          as: 'categoria'
        }
      })
    
      if(!produto) {
        return res.render('erro-validacao', { mensagemErro: 'Produto não existe' })
        
      }
    
      const obj = {
        produto: produto,
        categorias: await Categoria.findAll(),
        usuario: await Usuario.findByPk(usuario)
      }
    
      return res.render('produtos/editar-produto', obj)
    },
    
    editProdutoId: async function(req,res){
    
        const idProduto = req.params.idProduto
    
        await Produto.update(req.body, {
            where: {
                id: idProduto
            }
             
        })
    
        return res.redirect('/superadmin/produtos')
    },
    
    
    
    categoriaAdmin: async function(req,res){
        const obj = {
            categorias: await Categoria.findAll()
          }
       return res.render('categorias/admin-categorias',obj)
    },
    
    
    categoriaCriar: async function(req,res){
    
        return res.render('categorias/form-categorias')
    },
    
    
    categoriaCriarPost: async function(req,res){
    
        req.body.imagem =  req?.file?.filename
        await Categoria.create(req.body)
        console.log(req.body)
        return res.redirect('/superadmin/categorias')
    },
    
    categoriaId: async function(req,res){

      try {
        
        const idCategoria = req.params.idCategoria
        const obj = {
          categorias: await Categoria.findByPk(idCategoria, {
            include: {
              model: Produto,
              as: 'produtos'
            }
          })
        }
        return res.render('categorias/ver-categoria', obj)
      } catch (error) {
        return res.render('categorias/ver-categoria')
      }
    },
    
    categoriaEditId: async function(req,res){
        console.log('chamaou :idCategoria/edit')
        const idCategoria = req.params.idCategoria
        try{
            const produto = await Categoria.findByPk(idCategoria)
            const obj = {
                produto:produto
             }
    
            return res.render('categorias/editar-categorias',obj)
    
        }catch (error){
            return res.render('categorias/editar-categorias',obj)
        }
        
    },
    
    categoriaEditPost: async function(req,res){
        const idCategoria = req.params.idCategoria
        console.log('chhamou edição')
        await Categoria.update(req.body, {
            where: {
                id: idCategoria
            }
        })
        return res.redirect('/superadmin/categorias')
    },
    
    categoriaRemoveId: async function(req,res){
        const idCategoria = req.params.idCategoria
        await Categoria.destroy({
            where: {
                id: idCategoria
            }
             
        })
        return res.redirect('/superadmin/categorias')
    }

}


module.exports = superadmin;