var hapi = require('hapi');
var path = require('path');

var server = new hapi.Server(3000);

server.views({
	engines: { html: require('handlebars') },
	path: path.join(__dirname, 'templates')
});

server.route({
	method: 'GET',
	path: '/',
	handler : function(request, reply) {
		reply.view('index', { title: 'Assignment 2 : Hapi + Handlebars' });
		//console.log('hello + ' + encodeURIComponent(request.params.name));
	}
});

server.start(function(){
	console.log('server running at : '  + server.info.uri);
});
