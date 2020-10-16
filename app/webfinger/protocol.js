exports = module.exports = function() {
  var webfinger = require('fingro-webfinger');
  
  return webfinger();
};

exports['@implements'] = 'http://i.bixbyjs.org/uns/webfinger/Resolver';
exports['@name'] = 'webfinger';
