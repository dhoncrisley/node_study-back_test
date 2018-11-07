var moment = require('moment');

module.exports.add = function (application, req, res) {
    req.assert('valor', 'o valor deve ser numérico').isNumeric();
    req.assert('_id_comissao', 'o _id_comissao não pode ser vazio').notEmpty();
    req.assert('_id_comissao', '_id_comissao inválido').isLength(24, 24);
    req.assert('_id_funcionario', 'o _id_funcionario não pode ser vazio').notEmpty();
    req.assert('_id_funcionario', '_id_funcionario inválido').isLength(24, 24);
    req.assert('valor', 'o valor não pode ser vazio').notEmpty();
    req.assert('data_pagto', 'o data_pagto não pode ser vazio').notEmpty();
    
    var erros = req.validationErrors();
    if (!moment(req.body.data_pagto, 'YYYY-MM-DD', true).isValid()) {
        if (!erros) {
            erros = [];
        }
        erros.push({
            "location": "params",
            "param": "data_pagto",
            "msg": 'Data inválida, formato válido: AAAA-MM-DD'
        })
    }
    if (erros) {
        res.json({
            success: false,
            msg: "Dados incorretos",
            data: erros
        })
        return;
    }
    var connection = application.config.dbConnection;
    var dao = new application.app.models.PagamentosDAO(connection);
    dao.add(application, req, res);
}

module.exports.getAll = function (application, req, res) {
    var connection = application.config.dbConnection;
    var dao = new application.app.models.PagamentosDAO(connection);
    dao.getAll(application, req, res);
}


module.exports.get = function (application, req, res) {
    var connection = application.config.dbConnection;
    var dao = new application.app.models.PagamentosDAO(connection);
    dao.get(application, req, res);
}


module.exports.delete = function (application, req, res) {
    req.assert('_id', 'id inválido').isLength(24, 24);
    req.assert('_id', '_id não pode ser vazio').notEmpty();

    var erros = req.validationErrors();
    if (erros) {
        res.json({
            success: false,
            msg: "Dados incorretos",
            data: erros
        });
        return;
    }
    var connection = application.config.dbConnection;
    var dao = new application.app.models.PagamentosDAO(connection);
    dao.delete(application, req, res);
}

module.exports.update = function (application, req, res) {
    req.assert('valor', 'o valor deve ser numérico').isNumeric();
    req.assert('_id_comissao', 'o _id_comissao não pode ser vazio').notEmpty();
    req.assert('_id_comissao', '_id_comissao inválido').isLength(24, 24);
    req.assert('_id_funcionario', 'o _id_funcionario não pode ser vazio').notEmpty();
    req.assert('_id_funcionario', '_id_funcionario inválido').isLength(24, 24);
    req.assert('valor', 'o valor não pode ser vazio').notEmpty();
    req.assert('data_pagto', 'o data_pagto não pode ser vazio').notEmpty();
    
    var erros = req.validationErrors();
    if (!moment(req.body.data_pagto, 'YYYY-MM-DD', true).isValid()) {
        if (!erros) {
            erros = [];
        }
        erros.push({
            "location": "params",
            "param": "data_pagto",
            "msg": 'Data inválida, formato válido: AAAA-MM-DD'
        })
    }
    if (erros) {
        res.json({
            success: false,
            msg: "Dados incorretos",
            data: erros
        })
        return;
    }
    var connection = application.config.dbConnection;
    var dao = new application.app.models.PagamentosDAO(connection);
    dao.update(application, req, res);
}