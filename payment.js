var mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: 'TEST-7bd75aea-c0f3-476c-919f-feb33efcfa89'
});

var customer_data = { "email": "test_payer_12345@testuser.com" }

mercadopago.customers.create(customer_data).then(function (customer) {

  var card_data = {
    "token": "9b2d63e00d66a8c721607214cedaecda",
    "customer_id": customer.id,
    "issuer_id": "23",
    "payment_method_id": "debit_card"
  }

  mercadopago.card.create(card_data).then(function (card) {
    console.log(card);
  });

});