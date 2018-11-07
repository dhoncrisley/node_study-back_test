module.exports.add = function (application, req, res) {
    
    console.log(req.body);
    req.assert('nome', 'o nome não pode ser vazio').notEmpty();
    req.assert('nome', 'o campo nome deve ter de 2 até 60 caracteres').isLength(2, 60);
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
    var dao = new application.app.models.FuncionariosDAO(connection);
    dao.add(application, req, res);
}
module.exports.getAll = function (application, req, res) {
    console.log(req.query);
    var connection = application.config.dbConnection;
    var dao = new application.app.models.FuncionariosDAO(connection);
    dao.getAll(application, req, res);
}
module.exports.get = function (application, req, res) {
    var connection = application.config.dbConnection;
    var dao = new application.app.models.FuncionariosDAO(connection);
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
    var dao = new application.app.models.FuncionariosDAO(connection);
    dao.delete(application, req, res);
}

module.exports.update = function (application, req, res) {
    req.assert('_id', 'id inválido').isLength(24, 24);
    req.assert('_id', '_id não pode ser vazio').notEmpty();
    req.assert('nome', 'o campo nome não pode ser vazio').notEmpty();
    req.assert('nome', 'o campo nome deve ter de 2 até 60 caracteres').isLength(2, 60);

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
    var dao = new application.app.models.FuncionariosDAO(connection);
    dao.update(application, req, res);
}