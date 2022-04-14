const axios = require('axios').default

const idProduto = 10


async function app(){
    console.log('Fazendo request 1')
    let response = await axios.get('http://localhost:3000/api/produtos/')
    console.log('response 1', response.data.length)

    
    
    try {
        console.log('Fazendo request 2')
        response = await axios.get('http://localhost:3000/api/produtos/' + idProduto)
        console.log('response 2', response.data)

        console.log('Fazendo request 3')
        response = await axios.get('http://localhost:3000/api/produtos/10' + idProduto)

    } catch (erro) {
        console.log('produto nao encontrado', erro.response.status)
    }   
}
app()
