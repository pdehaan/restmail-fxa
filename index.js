var server = require('./server')
server.start(function () {
  console.log('Hapi server started at %s', server.info.uri)
})
