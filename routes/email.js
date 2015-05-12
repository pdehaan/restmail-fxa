var P = require('promise')
var requestp = require('request-promise')
var restmail = require('restmail-client')

module.exports = {
  path: '/email/{email}',
  method: 'GET',
  config: {
    handler: function (request, reply) {
      var email = request.params.email
      var webhookurl = request.server.info.uri + '/fxaconfirm'

      restmail(email).then(function (messages) {
        return messages.filter(fxaFilter).map(function (message) {
          var xlink = message.headers['x-link']
          return requestp.post({
            uri: webhookurl,
            json: xlink,
            simple: true
          }).then(function (data) {
            return 'verified ' + email
          }).catch(function (err) {
            console.log(err.message)
          })
        })
      }).then(function (messages) {
        return P.all(messages).then(reply)
      }).catch(function (err) {
        reply(err.message)
      })
    }
  }
}

function fxaFilter (message) {
  var from = message.from[0].name
  var xlink = message.headers['x-link']
  return (from === 'Firefox Accounts') && xlink
}
