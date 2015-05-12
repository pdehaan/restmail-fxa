var Hapi = require('hapi')

var routes = require('./routes/index')

var server = new Hapi.Server()
server.connection({
  host: '127.0.0.1',
  port: (process.env.PORT || 3000)
})
server.route(routes)

module.exports = server
