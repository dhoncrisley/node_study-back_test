module.exports.getFuncionarios = function (application, req, res) {
    console.log(req.query);
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.getFuncionarios(application, req, res);
}
module.exports.getFuncionario = function (application, req, res) {
    //console.log(req.params.id);
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.getFuncionario(application, req, res);
}
module.exports.getRecebimentos = function (application, req, res) {
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.getRecebimentos(application, req, res);
}
module.exports.getRecebimento = function (application, req, res) {
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.getRecebimento(application, req, res);
}
module.exports.getPagamentos = function (application, req, res) {
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.getPagamentos(application, req, res);
}
module.exports.getPagamento = function (application, req, res) {
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.getPagamento(application, req, res);
}

module.exports.addComissao = function (application, req, res) {
    req.assert('mes', 'o mes deve ser inteiro').isInt();
    req.assert('ano', 'o ano deve ser inteiro').isInt();
    req.assert('valor', 'o valor deve ser numérico').isNumeric();
    req.assert('mes', 'o mês não pode ser vazio').notEmpty();
    req.assert('ano', 'o mês não pode ser vazio').notEmpty();
    req.assert('valor', 'o valor não pode ser vazio').notEmpty();
    req.assert('data_receb', 'a data_receb não pode ser vazio').notEmpty();
    var erros = req.validationErrors();
    if (erros) {
        res.send(erros);
        return;
    }
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.addComissao(application, req, res);
}
module.exports.atribComissao = function (application, req, res) {
    req.assert('valor', 'o valor deve ser numérico').isNumeric();

    req.assert('_id_comissao', 'o _id_comissao não pode ser vazio').notEmpty();
    req.assert('_id_funcionario', 'o _id_funcionario não pode ser vazio').notEmpty();
    req.assert('valor', 'o valor não pode ser vazio').notEmpty();
    req.assert('data_pagto', 'o data_pagto não pode ser vazio').notEmpty();

    var erros = req.validationErrors();
    if (erros) {
        res.send(erros);
        return;
    }
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.atribComissao(application, req, res);
}
module.exports.addFuncionario = function (application, req, res) {
    
    console.log(req.body);
    req.assert('nome', 'o nome não pode ser vazio').notEmpty();
    var erros = req.validationErrors();
    if (erros) {
        res.send(erros);
        return;
    }
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.addFuncionario(application, req, res);
}