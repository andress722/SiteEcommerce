const indexController = {
    viewContato: function(req,res){
        let { nome, idade} = req.query
        res.render('contato', {nomeUsuario:nome})
    },
    confirmaContato: function(req,res){
        let { nome, email} = req.query
        res.render('enviado')
    }
}

module.exports = indexController