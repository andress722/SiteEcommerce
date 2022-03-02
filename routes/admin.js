const express = require('express')
const { route } = require('.')
const router = express.Router()
const ModelControllerBrand = require('../models/brand')

router.get('/servicos', function(req,res){
    const obj = {
        roupa: ModelControllerBrand.listaProdutos()
    }
    res.render('brand-admin')
})

router.get('/servicos/criar', function(req,res){
    res.render('form-servico')
})


router.post('/servicos/criar', function(req,res){

    console.log(req.body)

    res.render('form-servico')
})

module.exports = router