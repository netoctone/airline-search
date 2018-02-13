var path = require('path');
var fs = require('fs');
var csvParse = require('csv-parse/lib/sync');

var buffer = fs.readFileSync(path.resolve(__dirname, 'airports.dat'));
var airportsRaw = csvParse(buffer, { escape: '\\' });
var airports = airportsRaw
  .map(function (airportFields) {
    var name = airportFields[1];
    var country = airportFields[3];
    var iataCode = airportFields[4];
    return [iataCode, name, country];
  })
  .filter(function (airport) {
    return airport[0] && airport[0].length == 3;
  });

if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
  fs.mkdirSync(path.resolve(__dirname, 'dist'));
}
fs.writeFileSync(
  path.resolve(__dirname, 'dist', 'airports.json'),
  JSON.stringify(airports)
);
