module.exports = (connection, DataTypes) => {

    const model = connection.define('Usuario', {
         id:{
             type: DataTypes.INTEGER(100),
             primaryKey: true,
             autoIncremet: true
         },
         imagem:{
             type: DataTypes.STRING(100)
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
     },{
         timestamps: true,
         tableName: 'usuarios'
     })
      model.sync({alter:true})
      return model
 }
 