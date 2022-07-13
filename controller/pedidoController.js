var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const { Usuario, Produto, Categoria, Carrinho} = require('../models')
const multer = require('multer');

var session = require('express-session')
const axios = require('axios').default



const pedidoController = {

      index: async function(req,res){
       const pedidos = await Carrinho.findAll()
       return res.render('pedidos', {pedidos})
      },
      adiciona: async(req,res)=> {
        const idProduto = req.params.idProduto
        const produtos = await Produto.findByPk(idProduto)
  
            if(!produtos) {
            return res.render('form-servico-erro', { mensagemErro: 'Produto não existe' })
            
            }  
     
            return res.render('visualizar-produto',{produtos})
            },

      adicionaPost: async(req,res)=> {
        const idProdutos = req.params.idProdutos
        const usuario = req.session.usuarioLogado.id
        console.log(idProdutos)
        try {
            await Carrinho.create({
                id_produto: idProdutos,
                id_usuario: usuario
            })
            
            return res.redirect('/pedidos/vercarrinho')
            
        } catch (error) {
            console.log(error)
            return res.render('form-servico-erro', {mensagemErro: 'Erro ao criar carrinho'})
        }
      },


      

      verCarrinho: async function(req,res){
  
            return res.render('carrinho')
       },

      detalhePedido: async function(req,res){
        
        try {
          const usuario = req.session.usuarioLogado.id
          if(usuario != undefined){
            return res.render('pedidosDetalhe')
          }else{
            return res.render('form-servico-erro', { mensagemErro: 'Você precisa estar logado para continuar com a compra' })
          }
        } catch (error) {
           res.render('form-servico-erro', { mensagemErro: 'Você precisa estar logado para continuar com a compra' })
        }
       

        



      },

      
       enviarPedido: async function(req,res){
        
        const usuario = req.session.usuarioLogado.id
      
        const produtos = req.body


        for(let i=0; i < produtos.length; i++){
          if(produtos.length){
            console.log(produtos[i])
            await Carrinho.create({
              produto: produtos[i].produto,
              quantidade: produtos[i].quantidade,
              valor: produtos[i].valor,
              id_produto: produtos[i].id,
              id_usuario: usuario
            })
            // array.push(produtos[i].produto)
            // array.push(produtos[i].quantidade)
            // array.push(produtos[i].valor)
           
          } 
         
        }
        // 
      

        //   await Carrinho.create(
        //    produtos
        //  )
            
            return res.redirect('/')
            // return res.send(produtos)
       }
      

    }

      module.exports = pedidoController
