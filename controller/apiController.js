var express = require('express');
const axios = require('axios').default

const { Usuario, Produto, Categoria, UsuarioComum} = require('../models')


/* GET home page. */



const api = {

    


    index: async function(req, res, next) {
        
        const produtos = await Produto.findAll()
        res.render('produtos-copy',{produtos})
    },

    cep: async function(req, res, next) {
        
        const cep = await axios.get('https://viacep.com.br/ws/01001000/json')

        res.send(cep.data)
    },

    carrinho: async function(req, res, next){
        const carrinho = await axios.get('')
    }

}

module.exports = api