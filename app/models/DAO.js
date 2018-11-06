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
                from: "comissoes_pagas",
                localField: '_id',
                foreignField: "_id_funcionario",
                as: "comissoes"
            }
        }],
        collection: "funcionarios",
        callback: function (err, data) {
            if(err){
                console.log(err);
                res.json({
                 success: false,
                 msg: "Falha na operação",
                 erro: err
             })
             return;
             }
             console.log(data);
             res.json({
                 success: true,
                 msg: "Operação realizada com sucesso",
                 data: data
             });
        }
    };
    this._connection(dados, res);

}
DAO.prototype.getFuncionario = function (application, req, res) {
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
                        foreignField: "_id_funcionario",
                        as: "comissoes"
                    }
                }
            ],
            collection: "funcionarios",
            callback: function (err, data) {
                if(err){
                    console.log(err);
                    res.json({
                     success: false,
                     msg: "Falha na operação",
                     erro: err
                 })
                 return;
                 }
                 console.log(data);
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
DAO.prototype.getRecebimento = function (application, req, res) {
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
                if(err){
                    console.log(err);
                    res.json({
                     success: false,
                     msg: "Falha na operação",
                     erro: err
                 })
                 return;
                 }
                 console.log(data);
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
DAO.prototype.getRecebimentos = function (application, req, res) {
    var dados = {
        operacao: "BUSCAR",
        /* tipo: 'aggregate',
        query: [{
            $lookup: {
                from: "comissoes_pagas",
                localField: '_id',
                foreignField: "_id_comissao",
                as: "comissionados"
            }
        }], */
        tipo: 'find',
        query: {}, 
        collection: "comissoes_recebidas",
        callback: function (err, data) {
            if(err){
                console.log(err);
                res.json({
                 success: false,
                 msg: "Falha na operação",
                 erro: err
             })
             return;
             }
             console.log(data);
             res.json({
                 success: true,
                 msg: "Operação realizada com sucesso",
                 data: data
             });
        }
    };
    this._connection(dados, res);

}
DAO.prototype.getPagamento = function (application, req, res) {
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
                if(err){
                    console.log(err);
                    res.json({
                     success: false,
                     msg: "Falha na operação",
                     erro: err
                 })
                 return;
                 }
                 console.log(data);
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
DAO.prototype.getPagamentos = function (application, req, res) {
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
            if(err){
                console.log(err);
                res.json({
                 success: false,
                 msg: "Falha na operação",
                 erro: err
             })
             return;
             }
             console.log(data);
             res.json({
                 success: true,
                 msg: "Operação realizada com sucesso",
                 data: data
             });
        }
    };
    this._connection(dados, res);

}
DAO.prototype.addComissao = function (application, req, res) {
    var dadosForm = req.body;

    var dados = {
        operacao: "ADD",
        query: {
            mes: dadosForm.mes,
            ano: dadosForm.ano,
            valor: dadosForm.valor,
            data_receb: dadosForm.data_receb
        },
        collection: "comissoes_recebidas",
        callback: function (err, data) {
            if(err){
                console.log(err);
                res.json({
                 success: false,
                 msg: "Falha na operação",
                 erro: err
             })
             return;
             }
             console.log(data);
             res.json({
                 success: true,
                 msg: "Operação realizada com sucesso",
                 data: data
             });
        }
    };
    this._connection(dados, res);

}

DAO.prototype.atribComissao = function (application, req, res) {
    var dadosForm = req.body;

    var dados = {
        operacao: "ADD",
        query: {
            _id_funcionario: ObjectId(dadosForm._id_funcionario),
            _id_comissao: ObjectId(dadosForm._id_comissao),
            valor: dadosForm.valor,
            data_pagto: dadosForm.data_pagto
        },
        collection: "comissoes_pagas",
        callback: function (err, data) {
            if(err){
                console.log(err);
                res.json({
                 success: false,
                 msg: "Falha na operação",
                 erro: err
             })
             return;
             }
             console.log(data);
             res.json({
                 success: true,
                 msg: "Operação realizada com sucesso",
                 data: data
             });
        }
    };
    this._connection(dados, res);

}
DAO.prototype.addFuncionario = function (application, req, res) {
    var dadosForm = req.body;
    //res.send(req.query);
    console.log(dadosForm.nome)
    var dados = {
        operacao: "ADD",
        query: {
            nome: dadosForm.nome
        },
        collection: "funcionarios",
        callback: function (err, data) {
            if(err){
                console.log(err);
                res.json({
                 success: false,
                 msg: "Falha na operação",
                 erro: err
             })
             return;
             }
             console.log(data);
             res.json({
                 success: true,
                 msg: "Operação realizada com sucesso",
                 data: data
             });
        }
    };
    this._connection(dados, res);

}
module.exports = function () {
    return DAO;
}