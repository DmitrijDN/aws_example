var AWS = require('aws-sdk');

function DynamoDbService() {
    this.dynamoDb = new AWS.DynamoDB();
}

DynamoDbService.prototype.createItem = createItem;
DynamoDbService.prototype.getAllItems = getAllItems;
DynamoDbService.prototype.getItem = getItem;

function _getDynamoObjectItem(item) {
    var obj = {};
    for (var prop in item) {
        var value = null;
        if (typeof item[prop] === 'string') {
            value = { S: item[prop] };
        } else if (typeof item[prop] === 'number') {
            value = { N: item[prop].toString() };
        } else if (item[prop] instanceof Array) {
            value = { SS: item[prop] };
        }
        obj[prop] = value;
    }
    return obj;
}

function createItem(table, item, callback) {
    var self = this;
    var params = {
        TableName: table,
        Item: _getDynamoObjectItem(item)
    };

    self.dynamoDb.putItem(params, callback);
}

function getAllItems(table, callback) {
    var self = this;
    var params = {
        TableName: table
    };

    self.dynamoDb.scan(params, callback);
}

function getItem(table, idName, id, callback) {
    var self = this;
    var params = {
        TableName: table,
        Key: {}
    };

    params.Key[idName] = { S: id };

    self.dynamoDb.getItem(params, callback);
}

// function updateItem(table, item, callback) {

// }
// SET a=:value1, b=:value2 DELETE :value3, :value4, :value5

module.exports = new DynamoDbService();
