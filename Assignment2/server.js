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
	}
});
server.route({
	method: 'GET',
	path: '/assignment3',
	handler: function(request, reply) {
		reply.view('assignment3', { title: 'Assignment 3 : jQuery' });
	}

});

server.route({
	method: 'GET',
	path: '/authors',
	handler: function(request, reply)
	{
		reply([
		{ firstName: "Niranrat", lastName: "A"		},
		{ firstName: "Akachai", lastName: "K"		},
		{ firstName: "Pichet", lastName: "B"		}

		]);
	}
})

server.route({
	method: 'GET',
	path: '/{param*}',
	handler:  {
		directory: {
			path: 'app'
		}
	}
});

server.start(function(){
	console.log('server running at : '  + server.info.uri);
});
