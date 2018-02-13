var path = require('path');
var fs = require('fs');

var buffer = fs.readFileSync(path.resolve(__dirname, 'routes.dat'));
var routesRaw = buffer.toString().split("\n");
var routes = {};
for (var i = 0; i < routesRaw.length; i++) {
  var routeFields = routesRaw[i].split(',');
  var from = routeFields[2];
  var to = routeFields[4];
  var uniqKey = [from, to].sort().join('');

  var routeExisting = routes[uniqKey];
  if (routeExisting) {
    if (from != routeExisting[0]) {
      // bidirectional route
      routes[uniqKey] = [from, to, true];
    }
  } else {
    routes[uniqKey] = [from, to, false];
  }
}
if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
  fs.mkdirSync(path.resolve(__dirname, 'dist'));
}
fs.writeFileSync(
  path.resolve(__dirname, 'dist', 'routes.csv'),
  Object.values(routes)
        .map((route) => route[0] + ',' + route[1] + ',' + (route[2] ? 't' : 'f'))
        .join("\n")
);
