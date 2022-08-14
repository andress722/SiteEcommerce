let produto = [{
    nome: 'USB',
    valor: 67
}, {
    nome: 'Teclado',
    valor: 12
}]

let salvar = [{
    nome: 'Teclado',
    valor: 12
}]

let nomes = ['Teclado', 'USB']

//for(let i=0; i<produto.length; i++){
    //if(produto[i].nome.indexOf(nomes[1]) !== -1){
    //    if(salvar.length == 0){
     //       salvar.push(produto[i])
     //   }else{
    //        let filtro = salvar.filter(item =>(item.nome === produto[i].nome)).length > 0
         //       if(filtro){
           //         salvar.map(items => {
            //            items.nome = items.nome
           //             items.valor += items.valor
                //        return items
           //         })
               // }else{
               //     salvar.push(produto[i])
              //  }
           // }


                
            
       // }
        
  //  }


console.log(salvar)

let filtradoOf = []

for(let i = 0; i<nomes.length; i++){
    produto.findIndex(e => {
        if(e.nome == nomes[i]){
            filtradoOf.push(e)
        }
    })
}

console.log(filtradoOf)