var product = JSON.parse(localStorage.getItem('produtos'))

    

    var comP = product.map(items=> {
                        items.produto = items.produto
                                         
                        items.quantidade = parseInt(items.quantidade)
                        items.valor = parseInt(items.valor)
                        items.id = parseInt(items.id)
                        items.total = parseInt(items.valor * items.quantidade)
                        return items    
    })