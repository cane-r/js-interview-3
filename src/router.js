const {
  respondWith404NotFound,urlPathOf
} = require('./httpHelpers');
const { routerHandleResult } = require('./routerHandleResult');

const routers = [
  require('./ping').pingRouter,
  require('./contacts').contactsRouter,
  require('./contactDetails').contactDetailsRouter,
];

//what a stupid way of handling
module.exports = function(request, response) {
//routers.forEach((i,e) => {
  if (urlPathOf(request) == '/ping'){
    routers[0].handle(request, response);
  }
  else if (urlPathOf(request) == '/contacts'){
    routers[1].handle(request, response);
  }
  else if (urlPathOf(request) == '/contactDetails'){
    routers[2].handle(request, response);
  }
  else {
    respondWith404NotFound(response);
  }
//});
};
