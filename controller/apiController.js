var express = require('express');
const axios = require('axios').default

const { Usuario, Produto, Categoria, UsuarioComum,Carrinho} = require('../models')


/* GET home page. */



const api = {

    index: async function(req, res, next) {
        
        const produtos = await Produto.findAll()
        res.send({produtos})    
    },

    carrinho: async function(req,res,next){

        const pedidos = await Carrinho.findAll()
        res.send({pedidos})
    },

    login: async function(req,res,next){
        const usuarios =  await UsuarioComum.findAll()
        res.send({usuarios})
    },

    cep: async function(req, res, next) {
        
        const cep = await axios.get('https://viacep.com.br/ws/01001000/json')

        res.send(cep.data)
    },


}

module.exports = api