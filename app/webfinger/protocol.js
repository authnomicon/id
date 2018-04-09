exports = module.exports = function() {
  var webfinger = require('fingro-webfinger');
  
  return webfinger();
};

exports['@name'] = 'webfinger';
