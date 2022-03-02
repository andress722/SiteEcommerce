

const roupas = []

function listaProdutos() {
    return roupas
    }

function buscaServicosViaId(id){
    const roupa = roupas.find(function(item){
        return item.id == id
    })
    return roupa    
}


module.exports.listaProdutos = listaProdutos
module.exports.buscaServicosViaId = buscaServicosViaId