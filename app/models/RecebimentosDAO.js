var ObjectId = require('mongodb').ObjectID;

function RecebimentosDAO(connection) {
    this._connection = connection;
}
RecebimentosDAO.prototype.get = function (application, req, res) {
    if (!ObjectId.isValid(req.params.id)) {

        res.send('id inválido')
    } else {
        var dados = {
            operacao: "BUSCAR",
            tipo: 'aggregate',
            query: [{
                    $match: {
                        _id: {
                            $eq: ObjectId(req.params.id)
                        }
                    },
                },
                {
                    $lookup: {
                        from: "comissoes_pagas",
                        localField: '_id',
                        foreignField: "_id_comissao",
                        as: "comissionados"
                    }
                }
            ],
            collection: "comissoes_recebidas",
            callback: function (err, data) {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Falha na operação",
                        erro: err
                    })
                    return;
                }
                res.json({
                    success: true,
                    msg: "Operação realizada com sucesso",
                    data: data
                });
            }
        };
        this._connection(dados, res);
    }
}
RecebimentosDAO.prototype.getAll = function (application, req, res) {
    var dados = {
        operacao: "BUSCAR",
        tipo: 'find',
        query: {},
        collection: "comissoes_recebidas",
        callback: function (err, data) {
            if (err) {

                res.json({
                    success: false,
                    msg: "Falha na operação",
                    erro: err
                })
                return;
            }
            res.json({
                success: true,
                msg: "Operação realizada com sucesso",
                data: data
            });
        }
    };
    this._connection(dados, res);

}

RecebimentosDAO.prototype.add = function (application, req, res) {
    var dadosForm = req.body;

    var dados = {
        operacao: "ADD",
        query: {
            mes: parseInt(dadosForm.mes),
            ano: parseInt(dadosForm.ano),
            valor: parseFloat(dadosForm.valor),
            data_receb: dadosForm.data_receb
        },
        collection: "comissoes_recebidas",
        callback: function (data) {
            res.status(200).json({
                success: true,
                msg: "Operação realizada com sucesso",
                data: data
            });
        },
        erro: function (err) {
            res.status(500).json({
                success: false,
                msg: "Erro interno",
                data: err
            });
        }
    };
    this._connection(dados, res);
}

RecebimentosDAO.prototype.delete = function (application, req, res) {
    var dadosForm = req.body;
    var dados = {
        operacao: "DELETE",
        query: {
            _id: ObjectId(dadosForm._id)
        },
        collection: 'comissoes_recebidas',
        callback: function (data) {
            if (data.result.n == 0) {
                res.status(404).json({
                    success: false,
                    msg: "Dado inexistente",
                    data: data
                })
                return;
            }
            res.status(200).json({
                success: true,
                msg: "Operação realizada com sucesso",
                data: data,
            });
        },
        erro: function (err) {
            res.status(500).json({
                success: false,
                msg: "Erro interno",
                data: err
            });
        }
    };
    this._connection(dados, res);

}
RecebimentosDAO.prototype.update = function (application, req, res) {
    var dadosForm = req.body;
    var id = dadosForm._id;
    delete dadosForm['_id'];
    var dados = {
        operacao: "PUT",
        query: [{
            _id: ObjectId(id)
        }, {
            $set: dadosForm
        }, {}],
        collection: 'comissoes_recebidas',
        callback: function (data) {
            if (data.result.n == 0) {
                res.status(404).json({
                    success: false,
                    msg: "Dado inexistente",
                    data: data
                })
                return;
            }
            res.status(200).json({
                success: true,
                msg: "Operação realizada com sucesso",
                data: data,
            });
        },
        erro: function (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                msg: "Erro interno",
                data: err
            });
        }
    };
    this._connection(dados, res);

}

module.exports = function () {
    return RecebimentosDAO;
}