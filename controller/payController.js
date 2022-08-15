var mercadopago = require('mercadopago');
const cors = require("cors");
var express = require('express');
const { json } = require('body-parser')
const { Usuario, Produto, Categoria, Carrinho,Pedido} = require('../models')
mercadopago.configure({
  access_token: 'TEST-8218594776835434-091003-3eab1f89cb25fb2fb5ec4eb39b8159da-258177562'
});

const creaOrder = {
  

  teste: async (req,res) => {
    
    try {
      const product = await Carrinho.findAll()
      const usuario = req.session.usuarioLogado.id
      console.log(usuario)
      let pFilter = product.filter(item => item.id_usuario === usuario).filter((item,pos) => {if(item.numero_pedido === '0aCv9lPHyWadppNR7jAK'){
        item.total = parseInt(item.total)+parseInt(item.total)
        return item.indexOf(item) === pos
      }})
      return res.send(pFilter)
    } catch (error) {
      res.send(error)
    }
    
  },

  createPrefer: async (req,res) => {
    const body = req.body
    console.log(body)
  
      var preference = {

      items: body.map(e=> (
            {
              
                    title: e.description,
                    unit_price: Number(e.price),
                     quantity: Number(e.quantity),
                      
                  }
                  
                  )),
        
                  back_urls: {
                    "success": "http://localhost:3000/pedidos/feedback",
                    "failure": "http://localhost:3000/pedidos/feedback",
                    "pending": "http://localhost:3000/pedidos/feedback"
                  },
                  auto_return: "approved",
                
        
    

      
    
    };
    console.log(preference)
    mercadopago.preferences.create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id
        });
      }).catch(function (error) {
        console.log(error);
      });
      console.log(json)
      
  }, 
  feedback:  (req,res) => {
    console.log(req.query.payment_id)
    console.log(req.query.status)
    console.log(req.query.merchant_order_id)
    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id
    });
  },
  
 

}
   
module.exports = creaOrder
