var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const bodyParser = require('body-parser')
const { Usuario, Produto} = require('../models')
const axios = require('axios').default
const {check} = require('express-validator')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const obj = {
    produtos: await Produto.findAll()
  }
  res.render('index', obj);
});

let validaRegistro = [
  check('nome')
      .notEmpty().withMessage('Deve preencher este campo').bail()
]


router.get('/contato', async function(req,res){
  

  try{
    const usuario = req.session.usuarioLogado.id
  const obj = {
    usuario: await Usuario.findByPk(usuario),
  }

  res. render('contato', obj)
  }catch(error){
    res. render('contato')
  }
})

router.get('/produtos', async function(req,res){
  try {      
      const obj = {
        produtos: await Produto.findAll()
    }
    res.render('produtos', obj)
  } catch (error) {
    res.render('produtos')
  }
})

router.get('/login', function(req,res){
  res.render('login')
})


router.post('/login', async function(req,res){

  try{

    const usuarioLogin = await Usuario.findOne({
      where: {
        email: req.body.email
      }
    })
    if(usuarioLogin && usuarioLogin.senha == req.body.senha){
        
      req.session.estaLogado = true
      req.session.usuarioLogado = usuarioLogin
        
        res.redirect('/admin')

    }else{
        res.render('form-servico-erro', { mensagemErro: 'Senha Invalida'})
    }
  }catch (erro){
    next(erro)
  }
})

router.get('/cadastro', function(req,res){
  res.render('form-usuario')
})

router.post('/cadastro', validaRegistro, async function(req,res){


    const emailReq = req.body.email

    const email = await Usuario.findOne({ where: { email: emailReq } });
    if (!email) {
      await Usuario.create(req.body)
      res.redirect('/login')
  } else {
      res.render('form-servico-erro', {mensagemErro: 'Email já cadastrado'})
}
})


router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
})


router.get('/cep', async function(req,res,next){
  res.render('cep')
})

router.post('/cep', async function(req,res,next){
  const response = await axios.get(`https://viacep.com.br/ws/${req.body.cep}/json`)
  console.log(response.data)

  res.render('dados-cep', response.data)
})

module.exports = router;
