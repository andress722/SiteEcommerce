var express = require('express');

const { Usuario, Produto, Categoria, UsuarioComum} = require('../models')


/* GET home page. */



const usuario = {

    admin: async(req,res)=>{
      const usuario = req.session.usuarioLogado.id
      const obj = {
        usuario: await UsuarioComum.findByPk(usuario)
      }
      return res.render('usuariocomum/admin-comprador', obj)
    },


    index: async function(req, res, next) {
        const obj = {
          produtos: await Produto.findAll(),
          categoria: await Categoria.findAll()
        }
        return res.render('index', obj);
      },
      
      
      login: function(req,res){
        return res.render('login')
      },
      
      
      loginPost: async function(req,res){
      
        try{
      
          const usuarioLogin = await UsuarioComum.findOne({
            where: {
              email: req.body.email
            }
          })
          if(usuarioLogin && usuarioLogin.senha == req.body.senha){
              
            req.session.estaLogado = true
            req.session.usuarioLogado = usuarioLogin
              
             return res.redirect('/')
      
          }else{
              return res.render('form-servico-erro', { mensagemErro: 'Senha Invalida'})
          }
        }catch (erro){
          next(erro)
        }
      },
      
      logout: function(req, res, next) {
        req.session.destroy()
        return res.redirect('/')
      },
      
      
      
      contato: async function(req,res){
        
      
        try{
          const usuario = req.session.usuarioLogado.id
          const obj = {
          usuario: await UsuarioComum.findByPk(usuario),
        }
      
          return  res. render('contato', obj)
        }catch(error){
         return res. render('contato')
        }
      },
      
      produtoUsuario: async function(req,res){
        try {      
            const obj = {
              produtos: await Produto.findAll()
          }
          return res.render('produtos', obj)
        } catch (error) {
          return res.render('produtos')
        }
      },
      
      produtoUsuarioId: async function(req,res){
        const idProduto = req.params.idProduto
        const obj = {
            produtos: await Produto.findByPk(idProduto)
        }
        return res.render('visualizar-produto', obj)
      },
      
      
      cadastro: function(req,res){
        return res.render('usuariocomum/form-usuario-comum')
      },
      
      cadastroPost: async function(req,res){      
      
          const emailReq = req.body.email
      
          const email = await UsuarioComum.findOne({ where: { email: emailReq } });
          if (!email) {
            await UsuarioComum.create(req.body)
            return res.redirect('/login')
        } else {
          returnres.render('form-servico-erro', {mensagemErro: 'Email já cadastrado'})
      }
      },
      
      cep: async function(req,res,next){
        return res.render('cep')
      },
      
     cepPost: async function(req,res,next){
        const response = await axios.get(`https://viacep.com.br/ws/${req.body.cep}/json`)
        console.log(response.data)
      
        return res.render('dados-cep', response.data)
      },
      favoritos: async function(req,res){

        const usuario = await Usuario.findByPk(req.session.usuarioLogado.id, {
            include:{
                model: Produto,
                as: 'favoritos'
            }
        })
        return res.render('favoritos', {
            favoritos: usuario.favoritos,
            usuario: req.session.usuarioLogado.id
        })
      },
    
      favoritoId: async function(req, res){
          const idProdutos = req.params.idProdutos
          const idUsuario = req.session.usuarioLogado.id
          try {
            await ProdutoFavoritoUsuario.create({
                produto_id: idProdutos,
                usuario_id: idUsuario
            })
           return res.redirect('/admin/favoritos')
          } catch (error) {
            console.log(error) 
           return res.redirect('/admin/favoritos')
          }  
    
     },
    
    
    removeIdFavorito: async function(req, res){
        const idProdutos = req.params.idProdutos
        const idUsuario = req.session.usuarioLogado.id
        
        await ProdutoFavoritoUsuario.destroy({
            where: {
                produto_id: idProdutos,
                usuario_id: idUsuario
            }
    
        })
    
       return res.redirect('/admin/favoritos')
    }
    


}

module.exports = usuario