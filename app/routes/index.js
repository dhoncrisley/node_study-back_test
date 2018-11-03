module.exports = function(application){
	application.get('/api/funcionarios', function(req, res){
		application.app.controllers.index.getFuncionarios(application, req, res);
	});
	application.get('/api/comissoes', function(req, res){
		application.app.controllers.index.getComissoes(application, req, res);
	});
	application.get('/api/addComissao', function(req, res){
	});
	application.post('/api/addComissao', function(req, res){
		application.app.controllers.index.addComissao(application, req, res);
	});
	
	application.get('/api/addfuncionario', function(req, res){
		res.send('apenas por POST abiguénho 😘');
		application.app.controllers.index.addFuncionario(application, req, res);
	});
	application.post('/api/addfuncionario', function(req, res){
		application.app.controllers.index.addFuncionario(application, req, res);
	});
}