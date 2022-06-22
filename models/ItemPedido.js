module.exports = (connection, DataTypes) => {
    const model = connection.define('ItemPedido', {
        id_item_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
            fk_pedido: DataTypes.INTEGER,
            fk_produto: DataTypes.INTEGER
    },
        {   timestamp: false,
            tableName: 'itenspedidos'
        })

        model.associate = models => {
            

            
            model.sync({alter:true})
        }
        
        return model
}