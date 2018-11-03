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
    var comissoesColl = db.collection('comissoes');
    var funcionariosColl = db.collection('funcionarios');

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
            db.collection(dados.collection).save(dados.query).then(dados.callback);
            break;
        default:
            break;
    }
}
module.exports = function () {
    return connMongoDB;
};