var mongo = require("mongodb").MongoClient;

var assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "ongold_test_1";

var connMongoDB = function (dados, res) {
    mongo.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        assert.equal(null, err);

        const db = client.db(dbName);
        query(db, dados, res);
        client.close();
    });
};

function query(db, dados, res) {
    switch (dados.operacao) {

        case "BUSCAR":
            switch (dados.tipo) {
                case 'aggregate':

                    db.collection(dados.collection).aggregate(dados.query)
                        .toArray(dados.callback);
                    break;
                case 'find':

                    db.collection(dados.collection).find(dados.query)
                        .toArray(dados.callback);
                    break;
            }
            break;
        case "ADD":
            db.collection(dados.collection).insertOne(dados.query).then(dados.callback, dados.erro);
            break;
        case "DELETE":
            db.collection(dados.collection).deleteOne(dados.query).then(dados.callback, dados.erro);
            break;
        case "PUT":
            db.collection(dados.collection).updateOne(dados.query[0],dados.query[1],dados.query[2]).then(dados.callback, dados.erro);
            break;
        default:
            break;
    }
}
module.exports = function () {
    return connMongoDB;
};