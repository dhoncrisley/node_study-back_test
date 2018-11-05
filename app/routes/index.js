module.exports = function (application) {
	application.get('/api/funcionarios', function (req, res) {
		application.app.controllers.index.getFuncionarios(application, req, res);
	});
	application.get('/api/funcionarios/:id', function (req, res) {
		application.app.controllers.index.getFuncionario(application, req, res);
	});
	application.get('/api/comissoes', function (req, res) {
		application.app.controllers.index.getComissoes(application, req, res);
	});

	application.post('/api/addComissao', function (req, res) {
		application.app.controllers.index.addComissao(application, req, res);
	});
	application.post('/api/atribComissao', function (req, res) {
		application.app.controllers.index.atribComissao(application, req, res);
	});

	application.post('/api/addfuncionario', function (req, res) {
		application.app.controllers.index.addFuncionario(application, req, res);
	});
	//get prevent
	application.get('/api/addComissao', function (req, res) {
		res.send('apenas POST')
	});
	application.get('/api/atribComissao', function (req, res) {
		res.send('apenas POST')
	});
	application.get('/api/addfuncionario', function (req, res) {
		res.send('apenas POST')
	});
}