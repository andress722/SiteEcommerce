function search(e, nome){
    e.preventDefault()

    localStorage.setItem('pesquisa', JSON.stringify(nome))
    alert(nome)

    window.location.href = `/procura/${nome}`
    
    
}
