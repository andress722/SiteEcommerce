module.exports = (connection, DataTypes) => {
    const model = connection.define('Pedido', {
        id_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
            status:DataTypes.STRING,
            fk_usuario: DataTypes.INTEGER
    },
        {   timestamp: false,
            tableName: 'pedidos'
        })

        model.associate = models => {
            model.belongsToMany(models.Produto, {
                through: models.ItemPedido,
                foreignKey: 'fk_produto',
                as: 'itensPedido'
            })
            model.sync({alter:true})
        }
        
        return model
}