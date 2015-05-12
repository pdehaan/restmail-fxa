var url = require('url')

var FxaClient = require('fxa-js-client')

module.exports = {
  path: '/fxaconfirm',
  method: 'POST',
  config: {
    handler: function (request, reply) {
      var xlink = url.parse(request.payload, true)
      try {
        verifyCode(xlink.host, xlink.query.uid, xlink.query.code).then(reply, reply)
      } catch (err) {
        reply(err.toString())
      }
    }
  }
}

function verifyCode (server, uid, code) {
  // Map the content server URLs to their auth server endpoints.
  var ENDPOINTS = {
    'accounts.firefox.com': 'api.accounts.firefox.com',
    'accounts.stage.mozaws.net': 'api-accounts-stage.mozaws.net',
    'stable.dev.lcip.org': 'stable.dev.lcip.org/auth',
    'nightly.dev.lcip.org': 'nightly.dev.lcip.org/auth',
    'latest.dev.lcip.org': 'latest.dev.lcip.org/auth'
  }
  var authServer = ENDPOINTS[server]
  if (!server) {
    throw new Error('Invalid server, ' + server)
  }
  var client = new FxaClient('https://' + authServer)
  return client.verifyCode(uid, code)
}
