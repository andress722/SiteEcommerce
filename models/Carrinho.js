module.exports = (connection, DataTypes) => {
    const model = connection.define('Carrinho', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
              autoIncrement: true
        },
        produto: {
        type: DataTypes.STRING(100)
    },
        quantidade: {
        type: DataTypes.INTEGER
            },
        
            valor: {
            type: DataTypes.INTEGER
        },
        total: {
        type: DataTypes.INTEGER
    },


    }, 
    {   timestamp: false,
        tableName: 'carrinhos'
    }  
        
    )
        model.associate = models => {

      
            model.belongsTo(models.Produto,{
                foreignKey: 'id_produto',
                as: 'addcarrinhos'
            })
    
            
           
            model.sync({alter:true})
        }
    
        return model
    }
