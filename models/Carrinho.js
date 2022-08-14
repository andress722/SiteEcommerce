module.exports = (connection, DataTypes) => {
    const model = connection.define('Carrinho', {
       
        produto: {
        type: DataTypes.STRING
    },
        quantidade: {
        type: DataTypes.STRING
            },
        
            valor: {
            type: DataTypes.STRING
        },
        total: {
        type: DataTypes.STRING
    }, numero_pedido: {
        type: DataTypes.STRING
    },
    id_produto: {
        type: DataTypes.STRING
    }
  


    }, 
    {   timestamp: true,
        tableName: 'carrinhos'
    }  
        
    )
        model.associate = models => {

      
            model.belongsTo(models.Produto,{
                foreignKey: 'id_produto',
                as: 'addcarrinhos'
            })
            
            model.belongsTo(models.UsuarioComum, {
                foreignKey: 'id_usuario',
                as: 'carrinhousuarios'
            })

          
           
            model.sync({alter:true})
        }
    
        return model
    }
