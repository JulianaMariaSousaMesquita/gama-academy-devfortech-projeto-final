const Sequelize = require('sequelize');
const connection = require('../index');
const Endereco = require('./Endereco');

const Pedido = connection.define('pedido', {
    valor_total: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status_geral: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

Pedido.belongsTo(Endereco);

(async () => {
    const flag = process.env.APP_MODEL_FORCE == 'false' ? false : true;
    await Pedido.sync({ force: flag });
})();

module.exports = Pedido;