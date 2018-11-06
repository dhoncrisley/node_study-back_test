module.exports = function (application) {
	application.get('/api/funcionarios', function (req, res) {
		application.app.controllers.index.getFuncionarios(application, req, res);
	});
	application.get('/api/funcionarios/:id', function (req, res) {
		application.app.controllers.index.getFuncionario(application, req, res);
	});
	application.get('/api/recebimentos', function (req, res) {
		application.app.controllers.index.getRecebimentos(application, req, res);
	});
	application.get('/api/recebimentos/:id', function (req, res) {
		application.app.controllers.index.getRecebimento(application, req, res);
	});
	application.get('/api/pagamentos', function (req, res) {
		application.app.controllers.index.getPagamentos(application, req, res);
	});
	application.get('/api/pagamentos/:id', function (req, res) {
		application.app.controllers.index.getPagamento(application, req, res);
	});

	application.post('/api/recebimentos', function (req, res) {
		application.app.controllers.index.addComissao(application, req, res);
	});
	application.post('/api/pagamentos', function (req, res) {
		application.app.controllers.index.atribComissao(application, req, res);
	});
	application.post('/api/funcionarios', function (req, res) {
		application.app.controllers.index.addFuncionario(application, req, res);
	});
/* 	application.post('/api/funcionariosteste', function (req, res) {
		dados = req.body;
		console.log(json(dados))
		res.json(dados);
	});
	application.get('/', function (req, res) {
		res.render('index');
	}); */

}