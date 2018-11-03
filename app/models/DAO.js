var ObjectId = require('mongodb').ObjectID;

function DAO(connection) {
    this._connection = connection;
}


DAO.prototype.getFuncionarios = function (application, req, res) {

    var dados = {
        operacao: "BUSCAR",
        tipo: 'aggregate',
        query: [{
            $lookup: {
                from: "comissoes",
                localField: '_id',
                foreignField: "_id_funcionario",
                as: "comissoes"
            }
        }],
        collection: "funcionarios",
        callback: function (err, data) {
            if (err) throw err;
            res.send(data);
        }
    };
    this._connection(dados, res);

}
DAO.prototype.getComissoes = function (application, req, res) {
    var dados = {
        operacao: "BUSCAR",
        tipo: 'aggregate',
        query: [{
            $lookup: {
                from: "funcionarios",
                localField: '_id_funcionario',
                foreignField: "_id",
                as: "detalhes_funcionario"
            }
        }],
        collection: "comissoes",
        callback: function (err, data) {
            if (err) throw err;
            res.send(data);
        }
    };
    this._connection(dados, res);

}
DAO.prototype.addComissao = function (application, req, res) {
    var dadosForm = req.body;

    var dados = {
        operacao: "ADD",
        query: {
            _id_funcionario: ObjectId(dadosForm._id_funcionario),
            mes: dadosForm.mes,
            ano: dadosForm.ano,
            valor: dadosForm.valor,
            data_pagto: dadosForm.data_pagto
        },
        collection: "comissoes",
        callback: function (err, result) {
            console.log(result);
            res.send('comissão salva!');
        }
    };
    this._connection(dados, res);

}
DAO.prototype.addFuncionario = function (application, req, res) {
    var dadosForm = req.query;
    //res.send(req.query);
    console.log(dadosForm.nome)
    var dados = {
        operacao: "ADD",
        query: {
            nome: dadosForm.nome
        },
        collection: "funcionarios",
        callback: function (err, result) {
            console.log(result);
            res.send('funcionario salvo!');
        }
    };
    this._connection(dados, res);

}
module.exports = function () {
    return DAO;
}