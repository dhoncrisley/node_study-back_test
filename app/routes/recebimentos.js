module.exports = function (application) {

	application.get('/api/recebimentos', function (req, res) {
		application.app.controllers.recebimentos.getAll(application, req, res);
	});
	application.get('/api/recebimentos/:id', function (req, res) {
		application.app.controllers.recebimentos.get(application, req, res);
	});
	application.post('/api/recebimentos', function (req, res) {
		application.app.controllers.recebimentos.add(application, req, res);
	});
	application.delete('/api/recebimentos', function (req, res) {
		application.app.controllers.recebimentos.delete(application, req, res);
	});
	application.put('/api/recebimentos', function (req, res) {
		application.app.controllers.recebimentos.update(application, req, res);
	});
}