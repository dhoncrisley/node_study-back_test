var moment = require('moment');

module.exports.add = function (application, req, res) {
    req.assert('mes', 'o mes deve ser inteiro').isInt();
    req.assert('mes', 'o mes deve conter 2 números').isLength(2, 2);
    req.assert('ano', 'o ano deve ser inteiro').isInt();
    req.assert('ano', 'o ano deve conter 4 números').isLength(4, 4);;
    req.assert('valor', 'o valor deve ser numérico').isNumeric();
    req.assert('mes', 'o mês não pode ser vazio').notEmpty();
    req.assert('ano', 'o mês não pode ser vazio').notEmpty();
    req.assert('valor', 'o valor não pode ser vazio').notEmpty();
    req.assert('data_receb', 'a data_receb não pode ser vazio').notEmpty();

    //req.checkBody('data_receb', 'the date must be valid').isValidDate();
    var erros = req.validationErrors();

    //valida a data
    if (!moment(req.body.data_receb, 'YYYY-MM-DD', true).isValid()) {
        if (!erros) {
            erros = [];
        }
        erros.push({
            "location": "params",
            "param": "data_receb",
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
    var dao = new application.app.models.RecebimentosDAO(connection);
    dao.add(application, req, res);
}
module.exports.getAll = function (application, req, res) {
    var connection = application.config.dbConnection;
    var dao = new application.app.models.RecebimentosDAO(connection);
    dao.getAll(application, req, res);
}
module.exports.get = function (application, req, res) {
    var connection = application.config.dbConnection;
    var dao = new application.app.models.RecebimentosDAO(connection);
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
    var dao = new application.app.models.RecebimentosDAO(connection);
    dao.delete(application, req, res);
}

module.exports.update = function (application, req, res) {
    req.assert('_id', 'id inválido').isLength(24, 24);
    req.assert('_id', '_id não pode ser vazio').notEmpty();
    req.assert('mes', 'o mes deve ser inteiro').isInt();
    req.assert('mes', 'o mes deve conter 2 números').isLength(2, 2);
    req.assert('ano', 'o ano deve ser inteiro').isInt();
    req.assert('ano', 'o ano deve conter 4 números').isLength(4, 4);;
    req.assert('valor', 'o valor deve ser numérico').isNumeric();
    req.assert('mes', 'o mês não pode ser vazio').notEmpty();
    req.assert('ano', 'o mês não pode ser vazio').notEmpty();
    req.assert('valor', 'o valor não pode ser vazio').notEmpty();
    req.assert('data_receb', 'a data_receb não pode ser vazio').notEmpty();

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
    var dao = new application.app.models.RecebimentosDAO(connection);
    dao.update(application, req, res);
}