const {Produto} = require('./models')

async function app(){
     const novoProduto = await Produto.create({
        imagem: '1212123dsdadasd',
        nome: 'Roupa Masculina',
        descricao: 'Roupa',
        valor: 25
    }
    )
    console.log('id do serviço criado: ' + novoProduto.id)
    
}

app()

