var express = require('express')
var router = express.Router()
const moduloNew = require('../models/new')



router.get('/', function(req,res){
    const obj = {
        roupas: moduloNew.listaProdutos()
    }
    res.render('new-in', obj)
})

module.exports = router