module.exports = {
  path: '/',
  method: 'GET',
  config: {
    handler: function (request, reply) {
      reply('usage: /email/{restmail address to poll}')
    }
  }
}
