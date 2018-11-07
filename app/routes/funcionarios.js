module.exports = function (application) {

	application.get('/api/funcionarios', function (req, res) {
		application.app.controllers.funcionarios.getAll(application, req, res);
	});
	application.get('/api/funcionarios/:id', function (req, res) {
		application.app.controllers.funcionarios.get(application, req, res);
	});
	application.post('/api/funcionarios', function (req, res) {
		application.app.controllers.funcionarios.add(application, req, res);
	});
	application.delete('/api/funcionarios', function (req, res) {
		application.app.controllers.funcionarios.delete(application, req, res);
	});
	application.put('/api/funcionarios', function (req, res) {
		application.app.controllers.funcionarios.update(application, req, res);
	});

}