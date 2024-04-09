module.exports = (connection, DataTypes) => {
    const Carrinho = connection.define('Carrinho', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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
        },
        numero_pedido: {
            type: DataTypes.STRING
        },
        id_produto: {
            type: DataTypes.INTEGER // Alterei para INTEGER, assumindo que o id do produto é um número
        },
        status: {
            type: DataTypes.STRING
        },
        payment: {
            type: DataTypes.INTEGER
        },
        merchantOrder: {
            type: DataTypes.INTEGER
        },
        id_pagamento: {
            type: DataTypes.STRING
        },
        id_usuario: {
            type: DataTypes.INTEGER // Adicione a coluna id_usuario para a chave estrangeira
        }
    }, {
        timestamps: true,
        tableName: 'carrinhos'
    });

    Carrinho.associate = models => {
        Carrinho.belongsTo(models.UsuarioComum, {
            foreignKey: 'id_usuario',
            as: 'usuario'
        });
    }

    // Sincronizar o modelo com o banco de dados
    // Isso irá criar a tabela 'carrinhos' caso ela não exista
    Carrinho.sync({ alter: true });

    return Carrinho;
};
