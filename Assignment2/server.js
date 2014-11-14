var hapi = require('hapi');
var path = require('path');
var Joi = require('joi');

var Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/registerdb');
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
       
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

 var registerSchema = new Mongoose.Schema({
           title : { type: String },
           firstName : { type: String },
           lastName : { type: String },
           gender : { type: String },
           other:  { type: String },
           favoritePet: []
       });
var MemberModel = Mongoose.model('member', registerSchema, 'members');

var server = new hapi.Server(3000);

server.views({
	engines: { html: require('handlebars') },
	path: path.join(__dirname, 'templates')
});

server.route({
	method: 'GET',
	path: '/register',
	handler: function(requres, reply) {
		reply.view('register', {title: 'Assignment 7 : Assignment 7: Hapi + Joi + Mongoose'});
	}
});

server.route({
	method: 'POST',
	path: '/register',
	handler: function(request, reply) {
		console.log("post");
		if (request.payload) {
			var memberModel = new MemberModel(request.payload);

           memberModel.save(function (err , newMember) {
               if (err) {
                   throw err;
               } else {
                   console.log('save -> ', newMember);
                   reply(newMember);
               }
           });

		}
	}
	,
	config: {
		 validate: {
           payload : {
               title : Joi.string().required(),
               firstName : Joi.string().required(),
               lastName : Joi.string().required(),
               other : Joi.string().required(),
               favoritePet : Joi.string().required()
           }
		}
	}
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
