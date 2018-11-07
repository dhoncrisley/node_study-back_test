var ObjectId = require('mongodb').ObjectID;

function PagamentosDAO(connection) {
    this._connection = connection;
}


PagamentosDAO.prototype.get = function (application, req, res) {
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
                        from: "funcionarios",
                        localField: '_id_funcionario',
                        foreignField: "_id",
                        as: "funcionario"
                    }
                },
                {
                    $unwind: "$funcionario"
                },
                {
                    $lookup: {
                        from: "comissoes_recebidas",
                        localField: '_id_comissao',
                        foreignField: "_id",
                        as: "detalhes_comissao"
                    }
                },
                {
                    $unwind: "$detalhes_comissao"
                },
                {
                    $project: {
                        _id: 1,
                        _id_funcionario: 1,
                        _id_comissao: 1,
                        ano: '$detalhes_comissao.ano',
                        mes: '$detalhes_comissao.mes',
                        valor: 1,
                        data_pagto: 1,
                        funcionario: '$funcionario.nome',
                    }
                }
            ],
            collection: "comissoes_pagas",
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
PagamentosDAO.prototype.getAll = function (application, req, res) {
    var dados = {
        operacao: "BUSCAR",
        tipo: 'aggregate',
        query: [{
                $lookup: {
                    from: "funcionarios",
                    localField: '_id_funcionario',
                    foreignField: "_id",
                    as: "funcionario"
                }
            },
            {
                $unwind: "$funcionario"
            },
            {
                $lookup: {
                    from: "comissoes_recebidas",
                    localField: '_id_comissao',
                    foreignField: "_id",
                    as: "detalhes_comissao"
                }
            },
            {
                $unwind: "$detalhes_comissao"
            },
            {
                $project: {
                    _id: 1,
                    _id_funcionario: 1,
                    _id_comissao: 1,
                    ano: '$detalhes_comissao.ano',
                    mes: '$detalhes_comissao.mes',
                    valor: 1,
                    data_pagto: 1,
                    funcionario: '$funcionario.nome',
                }
            }
        ],
        collection: "comissoes_pagas",
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
PagamentosDAO.prototype.add = function (application, req, res) {
    var dadosForm = req.body;
    var dados = {
        operacao: "ADD",
        query: {
            _id_funcionario: ObjectId(dadosForm._id_funcionario),
            _id_comissao: ObjectId(dadosForm._id_comissao),
            valor: parseInt(dadosForm.valor),
            data_pagto: dadosForm.data_pagto
        },
        collection: "comissoes_pagas",
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

PagamentosDAO.prototype.delete = function (application, req, res) {

    var dados = {
        operacao: "DELETE",
        query: {
            _id: ObjectId(dadosForm._id)
        },
        collection: 'comissoes_pagas',
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
PagamentosDAO.prototype.update = function (application, req, res) {
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
        collection: 'comissoes_pagas',
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
    return PagamentosDAO;
}