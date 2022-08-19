
const axios = require('axios')

async function request(){
const pay = await axios.get(`https://api.mercadopago.com/v1/payments/1307779713`, {
  headers: {
    'Authorization': 'Bearer TEST-8218594776835434-091003-3eab1f89cb25fb2fb5ec4eb39b8159da-258177562'
  }
})
let payment = await pay.data
console.log(payment)
}

request()