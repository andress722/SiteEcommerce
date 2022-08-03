module.exports = (connection, DataTypes) => {

    const model = connection.define('UsuarioComum', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: DataTypes.STRING(100)
        },
        email: {
          type: DataTypes.STRING(100)
        },
        senha: {
          type: DataTypes.STRING(150)
        },
        cep: {
          type: DataTypes.INTEGER
        },
        endereco: {
          type: DataTypes.STRING(100)
        },
        cidade: {
            type: DataTypes.STRING(20)
          },
        estado: {
            type: DataTypes.STRING(20)
          },
        bairro: {
            type: DataTypes.STRING(20)
          },
        numero: {
            type: DataTypes.INTEGER
          },
          token: {
            type: DataTypes.STRING(200)
          }
        
      }, {
        timestamps: true,
        tableName: 'usuarioscomuns'
      })

      model.associate = models => {

        model.hasMany(models.Carrinho, {
          
          foreignKey: 'id_usuario',
          as: 'carrinhousuarios'
      })
        

        model.sync({alter:true})

      }

    
      return model
 }
 
