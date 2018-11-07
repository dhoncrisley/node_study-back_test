module.exports = function (application) {

	application.get('/api/pagamentos', function (req, res) {
		application.app.controllers.pagamentos.getAll(application, req, res);
	});
	application.get('/api/pagamentos/:id', function (req, res) {
		application.app.controllers.pagamentos.get(application, req, res);
	});
	application.post('/api/pagamentos', function (req, res) {
		application.app.controllers.pagamentos.add(application, req, res);
	});
	application.delete('/api/pagamentos', function (req, res) {
		application.app.controllers.pagamentos.delete(application, req, res);
	});
	application.put('/api/pagamentos', function (req, res) {
		application.app.controllers.pagamentos.update(application, req, res);
	});

}