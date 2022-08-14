var {Usuario} = require('../models')

const verificaLoginAdm = async function verificaLoginAdm(req,res,next){
    if(!req.session.estaLogado){
        res.redirect('/superadmin/loginempresa')
        return
    }else{
        const id = req.session.usuarioLogado.id
        const usuario = await Usuario.findByPk(id)
        if(usuario.superadmin === 1){
            next()
        }
    }

   
}


module.exports = verificaLoginAdm