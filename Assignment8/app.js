
var program = require('commander');
var mysql = require('mysql');
var exec = require('child_process').exec;
var xml2js = require('xml2js');
var fs = require('fs');
var Sequelize = require('sequelize');
var _ = require('lodash');
var cheerio = require('cheerio');

var schema = {};

program.version('0.0.1')
       .option('-file, --file [file]', 'Input file (*.xml)')
       .option('-split, --split [split]', 'XML Node to split')
       .option('-db, --db [db]', 'Database name')
       .option('-table, --table [table]', 'Table name')
       .parse(process.argv);

var file = program.file;
var split = program.split;
var db = program.db;
var table = program.table;

if ((typeof program.file === 'boolean') || 
    (typeof program.split === 'boolean') ||
    (typeof program.db === 'boolean') ||
    (typeof program.table === 'boolean')) {

    program.help();
    return;
}

var parser = xml2js.Parser({ explicitArray: false });
var content = fs.readFileSync(file, 'utf8');
var xml;

parser.parseString(content.substring(0, content.length), function (err, result) {
    xml = result;
});

var $ = cheerio.load(content, {
    xmlMode: true
});

var maxLength = 0;
var data = {};
var dataToInsert = [];
var counter = 0;

$(split).each(function (index, element) {
    console.log('index');
    console.log(index);
    console.log('element');
    console.log($(element).text());
    data = {};
    $(element).children().each(function (index, element) {
        
        if ($(element).text() == parseInt($(element).text(), 10)) {
            schema[element.name] = Sequelize.INTEGER;
        }
        else {
            maxLength = $(element).text().length > maxLength ? $(element).text().length : maxLength;
            schema[element.name] = Sequelize.STRING(maxLength);
        }
        
        if ($(element).type == 'tag') {
            console.log('element.name');
            console.log(element.name);
            data[element.name] = $(element).text();
        }
    });

    dataToInsert[dataToInsert.length] = data;

    counter = counter + 1;
    console.log('counter');
    console.log(counter);


});

console.log('dataToInsert');
console.log(dataToInsert);

var sequelize = new Sequelize(db, 'root', null, {
    dialect: 'mysql',
    port: 3306
});

sequelize.sync({ force: true });
sequelize
  .authenticate()
  .complete(function (err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err)
        } else {
            console.log('Connection has been established successfully.')
        }
    });

var PostModel = sequelize.define(table, schema);
sequelize.sync({ force: true }).done(function () {
    PostModel.bulkCreate(dataToInsert).success(function () {
        console.log('done');
    });

});

 