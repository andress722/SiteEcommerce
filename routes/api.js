
const express = require('express')

const router = express.Router()

const {Produto} = require('../models')

router.get('/produtos', async (req, res, next) => {

   const produtos = await Produto.findAll()

   res.send(produtos)

})

router.post('/produtos', async (req,res,next) => {
    const prod = await Produto.create(req.body)

    res.send({
        id: prod.id
    })
})

router.get('/produtos/:idProdutos', async (req,res,next) => {
    const idProdutos = req.params.idProdutos

    const produto = await Produto.findByPk(idProdutos)

    res.send(produto)
})

module.exports = router