var {Usuario} = require('../models')

const verificaLoginAdm = function verificaLoginAdm(req,res,next){
    
    if(!req.session.estaLogado){
        res.redirect('/superadmin/loginempresa')
        return
    }
    if(req.session.usuarioLogado.id != 1){
        res.redirect('superadmin/loginempresa')
    }   
    next()
}


module.exports = verificaLoginAdm