const {Categoria} = require('./models')

async function app(){
     const novoProduto = await Categoria.create({
        nome: 'ROUPAO',

    }
    )
    console.log('id do serviço criado: ' + novoProduto.id)
    
}

app()

