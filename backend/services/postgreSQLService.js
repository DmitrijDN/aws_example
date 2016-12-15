var Sequelize = require('sequelize');

function PostgreSQLService() {
    this.rdsDb = 'footballers';
    this.host = process.env.AWS_RDS_HOST;
    this.username = process.env.AWS_RDS_USERNAME;
    this.password = process.env.AWS_RDS_PASSWORD;

    this.pgClient = new Sequelize(this.rdsDb, this.username, this.password, {
        host: this.host,
        dialect: 'postgres'
    });

    this.ItemModel = this.pgClient.define('footballer', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING },
        speed: { type: Sequelize.INTEGER },
        defend: { type: Sequelize.INTEGER },
        attack: { type: Sequelize.INTEGER },
        strength: { type: Sequelize.INTEGER },
    });


    this.ItemModel.sync().then(function (data) {
        console.log('POSTGRES DB CONNECTED');
    });
}

PostgreSQLService.prototype.getAll = getAll;
PostgreSQLService.prototype.createItem = createItem;

function createItem(item, callback) {
    var self = this;
    item.id = parseInt(Math.random() * 100000000000 * Math.random());
    self.ItemModel.create(item).then(function (data) {
        callback(null, data.dataValues);
    }).catch(function (err) {
        console.log('CREATE POSTGRES ITEM ERROR: ', err);
        callback(err, null);
    });
}

function getAll(callback) {
    var self = this;
    self.ItemModel.findAll({}).then(function (data) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
            result.push(data[i].dataValues);
        }
        callback(null, result);
    }).catch(function (err) {
        console.log('GET ITEMS FROM POSTGRES: ', err);
        callback(err, null);
    });
}

module.exports = new PostgreSQLService();
