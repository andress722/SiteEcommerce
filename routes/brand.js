var express = require('express')
var router = express.Router()
const ModelControllerBrand = require('../models/brand')

router.get('/', function (req,res){
    const obj = {
        roupas: ModelControllerBrand.listaProdutos()
    }
    res.render('brand',obj)
} )
router.get('/:idBrand', function(req,res){
    console.log('chamou brand dois')
    const {idBrand} = req.params
    const roupa = ModelControllerBrand.buscaServicosViaId(idBrand)
    res.render('dados-brand',roupa)
})

module.exports = router
