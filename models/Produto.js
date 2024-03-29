

module.exports = (connection, DataTypes) => {

    const model = connection.define('Produto', {
         id:{
             type: DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true
         },
         imagem:{
             type: DataTypes.STRING
         },
         nome:{
             type: DataTypes.STRING(50)
         },
         descricao:{
             type: DataTypes.STRING(100)
         },
         valor:{
             type: DataTypes.INTEGER
         },
         quantidade: {
             type: DataTypes.INTEGER(3)
         }
     },{
         timestamps: true,
         tableName: 'produtos'
     })
     model.associate = models => {
 
        

         model.belongsTo (models.Categoria, {
             foreignKey: 'categoria_id',
             as: 'categoria'
         })    
 
       
         
         model.belongsTo(models.Usuario, {
             foreignKey: 'usuario_id',
             as: 'usuarios'
         })
         
          
        model.hasMany(models.Carrinho, {
              
            foreignKey: 'id_produto',
            as: 'addcarrinho'
        })
        model.hasMany(models.FavoritoProduto, {
            foreignKey: 'id_produto',
            as: 'favo'
        })

   
       
         model.sync({alter:true})
     }
 
     return model
 }
 