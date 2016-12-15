var File = require('../schemas/file');

function FileRepository() {
    this.model = File;
}

FileRepository.prototype.add = add;
FileRepository.prototype.getAll = getAll;
FileRepository.prototype.getById = getById;
FileRepository.prototype.removeItem = removeItem;

function add(obj, callback) {
    var model = this.model;
    var newItem = new model(obj);
    newItem.save(callback);
}

function getAll(callback) {
    var query = this.model.find();
    query.exec(callback);
}

function getById(id, callback) {
    var query = this.model.findOne({ _id: id });
    query.exec(callback);
}

function removeItem(id, callback) {
    var query = this.model.remove({ _id: id });
    query.exec(callback);
}

module.exports = new FileRepository();
