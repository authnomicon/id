exports = module.exports = function(resolver) {
  var api = {};
  
  api.resolveServices = function(id, type, cb) {
    resolver.resolveServices(id, type, cb);
  };
  
  return api;
};

exports['@implements'] = 'http://schemas.authnomicon.org/js/id';
exports['@singleton'] = true;
exports['@require'] = [
  './resolver'
];
