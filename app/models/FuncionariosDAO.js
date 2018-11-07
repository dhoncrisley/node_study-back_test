var ObjectId = require('mongodb').ObjectID;

function FuncionariosDAO(connection) {
    this._connection = connection;
}



FuncionariosDAO.prototype.get = function (application, req, res) {
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
                if (err) {
                    //console.log(err);
                    res.json({
                        success: false,
                        msg: "Falha na operação",
                        erro: err
                    })
                    return;
                }
                //console.log(data);
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
FuncionariosDAO.prototype.getAll = function (application, req, res) {

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
            if (err) {
                //console.log(err);
                res.json({
                    success: false,
                    msg: "Falha na operação",
                    erro: err
                })
                return;
            }
            //console.log(data);
            res.json({
                success: true,
                msg: "Operação realizada com sucesso",
                data: data
            });
        }
    };
    this._connection(dados, res);

}
FuncionariosDAO.prototype.add = function (application, req, res) {
    var dadosForm = req.body;
    //res.send(req.query);
    //console.log(dadosForm.nome)
    var dados = {
        operacao: "ADD",
        query: {
            nome: dadosForm.nome
        },
        collection: "funcionarios",
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
FuncionariosDAO.prototype.delete = function (application, req, res) {
    var dadosForm = req.body;
    //res.send(req.query);
    //console.log(dadosForm._id)
    var dados = {
        operacao: "DELETE",
        query: {
            _id: ObjectId(dadosForm._id)
        },
        collection: 'funcionarios',
        callback: function (data) {
            //console.log(data.result);
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
FuncionariosDAO.prototype.update = function (application, req, res) {
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
        collection: 'funcionarios',
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
    return FuncionariosDAO;
}