function addCarrinhos(produto,qtd,valor,id){

    
    const produtos = {
        nomeProduto: produto,
        quantidade: qtd,
        valorProduto: valor,
        id: id
        
    }
    if(produtos === ''){
        alert('é necessario informar')
    }else{
        if(localStorage.getItem('produtos') === null ){
            let listaProdutos = [produtos]
            localStorage.setItem('produtos', JSON.stringify(listaProdutos))
        }else{
            let listaProdutos = JSON.parse(localStorage.getItem('produtos'))

            let produtos = listaProdutos.pop()
                	
            console.log(produtos)
            
            localStorage.setItem('produtos', JSON.stringify(listaProdutos))
  
            console.log('push funcionou')
            console.log(listaProdutos)
        }
    }   

 }

 