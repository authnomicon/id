exports = module.exports = function(IoC, webfinger, lrdd, mx, logger) {
  // Load modules.
  var fingro = require('fingro');
  
  
  var resolver = new fingro.Resolver();
  
  return Promise.resolve(resolver)
    .then(function(resolver) {
      var components = IoC.components('http://schemas.authnomicon.org/js/id/EntityResolutionProtocol');
      
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(protocols) {
          protocols.forEach(function(protocol, i) {
            resolver.use(protocol);
            logger.info('Loaded entity-based identity resolution protocol: ' + components[i].a['@name']);
          });
          
          //resolver.use(webfinger);
          resolver.use(lrdd);
        })
        .then(function() {
          return resolver;
        });
    })
    .then(function(resolver) {
      var components = IoC.components('http://schemas.authnomicon.org/js/id/HostResolutionProtocol');
      
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(protocols) {
          protocols.forEach(function(protocol, i) {
            resolver.use(protocol);
            logger.info('Loaded host-based identity resolution protocol: ' + components[i].a['@name']);
          });
          
          //resolver.use(mx);
        })
        .then(function() {
          return resolver;
        });
    })
    .then(function(resolver) {
      return resolver;
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './webfinger/protocol',
  './lrdd/protocol',
  './mx/protocol',
  'http://i.bixbyjs.org/Logger'
];
