var fs = require('fs');
var xml2js = require('xml2js');
var program = require('commander');

program.version('0.0.1')
       .option('-f, --inputFile [inputFile]', 'Input file (*.xml)')
       .option('-o, --outputFile [outputFile]', 'Output file (*.json)')
       .parse(process.argv);

if (!program.inputFile || !program.outputFile) {
    program.help();
    return;
}

var parser = xml2js.Parser({ explicitArray: false });
var content = fs.readFileSync(program.inputFile, 'utf8');
var json;

parser.parseString(content.substring(0, content.length), function (err, result) {
    json = JSON.stringify(result, null, 2);
});

fs.writeFile(program.outputFile, json, function () {
    console.log("Save file successfully [" + program.outputFile + "]");
});

