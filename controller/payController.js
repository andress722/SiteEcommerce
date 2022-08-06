var mercadopago = require('mercadopago');
const cors = require("cors");
const { json } = require('body-parser');
mercadopago.configure({
  access_token: 'TEST-8218594776835434-091003-3eab1f89cb25fb2fb5ec4eb39b8159da-258177562'
});

const creaOrder = {
    payment: async (req, res)=> {
   
    
    var response = await mercadopago.payment_methods.listAll();
    var payment_methods = response.body;
    
    let preference = {
        items: [
          {
            title: 'Produtos',
            unit_price: 1001,
            quantity: 2,
          }
        ]
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
      // Este valor substituirá a string "<%= global.id %>" no seu HTML
        global.id = response.body.id;
      }).catch(function(error){
        console.log(error);
      })

      console.log(response)

    res.render('mercado-pago',{response}) 

},

  teste: async (req,res) => {
    res.render('mp')
  },

  createPrefer: async (req,res) => {
    let preference = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
        }
      ],
      back_urls: {
        "success": "http://localhost:3000/pedidos/feedback",
        "failure": "http://localhost:3000/pedidos/feedback",
        "pending": "http://localhost:3000/pedidos/feedback"
      },
      auto_return: "approved",
    };
  
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
