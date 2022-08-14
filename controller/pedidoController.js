var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const { Usuario, Produto, Categoria, Carrinho,Pedido} = require('../models')
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
        try {
          const usuario = req.session.usuarioLogado.id
          return res.render('carrinho', {usuario})
        } catch (error) {
          return res.render('carrinho')
        }
            
       },

       pagamento: async function(req,res){
         return res.render('mercado-pago')
       },

      detalhePedido: async function(req,res){
        
        return res.render('pedidosDetalhe')
      },

      
       enviarPedido: async function(req,res){
        
        try {
          const usuario = req.session.usuarioLogado.id
      
        const {id, produto,quantidade, valor, total,pedidos } = req.body
        const qtd = quantidade.toString()
          console.log(qtd)
      await Carrinho.create({
        produto: produto.join(),
        id_produto: id.join(),
        quantidade: quantidade.join(),
        valor: valor.join(),
        total: total.join(),
        id_usuario: usuario,
        numero_pedido: pedidos
      })        
          
        } catch (error) {
          return res.render('form-servico-erro', {mensagemErro: 'Erro ao criar pedido, tenta novamente ou entre contato conosco'})
        }
        
      // for(let i=0; i < produtos.length; i++){
          //if(produtos.length){
          //  console.log(produtos[i])
            
           // await Carrinho.create({
           //   produto: produtos[i].produto,
           //   quantidade: produtos[i].quantidade,
            //  valor: produtos[i].valor,
             // total: produtos[i].valor * produtos[i].quantidade,
             // id_produto: produtos[i].id,
            //  id_usuario: usuario,
            //  numero_pedido: produtos[i].pedidos
           // })
      
        }
      }

      module.exports = pedidoController
