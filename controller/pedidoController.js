var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const { Usuario, Produto, Categoria, Pedido, Carrinho} = require('../models')
const multer = require('multer');
const ItemPedido = require('../models/ItemPedido');
var session = require('express-session')




const pedidoController = {

      index: async function(req,res){
       const pedidos = await Pedido.findAll()
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
        console.log(idProdutos)
        try {
            await Carrinho.create({
                id_produto: idProdutos
            })
            
            return res.redirect('/pedidos/vercarrinho')
            
        } catch (error) {
            console.log(error)
            return res.render('form-servico-erro', {mensagemErro: 'Erro ao criar carrinho'})
        }
      },


      

      vercarrinho: async function(req,res){
            const produtos = await Carrinho.findAll({
        
                include: {
                  model: Produto,
                  as: 'addcarrinhos'
                },
              
              })
              const obj = {
                produtos:produtos
            }
            return res.render('carrinho',obj)
       },

       carrinho: async function(req,res){
        const produtos = await Produto.findAll()
          const obj = {
            produtos:produtos
        }
        return res.render('carrinho-teste',obj)
   },
    }

      module.exports = pedidoController
