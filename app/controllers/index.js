module.exports.getFuncionarios = function(application, req, res){
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.getFuncionarios(application, req, res);
}
module.exports.getComissoes = function(application, req, res){
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.getComissoes(application, req, res);
}
module.exports.addComissao = function(application, req, res){
    req.assert('mes', 'o mes deve ser inteiro').isInt();
    req.assert('ano', 'o ano deve ser inteiro').isInt();
    req.assert('valor', 'o valor deve ser numérico').isNumeric();

    req.assert('_id_funcionario', 'o _id_funcionario não pode ser vazio').notEmpty();
    req.assert('mes', 'o mês não pode ser vazio').notEmpty();
    req.assert('ano', 'o mês não pode ser vazio').notEmpty();
    req.assert('valor', 'o valor não pode ser vazio').notEmpty();
    req.assert('data_pagto', 'o data_pagto não pode ser vazio').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.send(erros);
        return;
    }
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.addComissao(application, req, res);
}
module.exports.addFuncionario = function(application, req, res){

    req.assert('nome', 'o nome não pode ser vazio').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.send(erros);
        return;
    }
    var connection = application.config.dbConnection;
    var dao = new application.app.models.DAO(connection);
    dao.addComissao(application, req, res);
}