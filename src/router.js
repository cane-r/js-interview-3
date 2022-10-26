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
// router.get('/ping',(request,response,next) => {routers[0].handle(request,response)});

module.exports = function(request, response) {
//routers.forEach((i,e) => {
  const path = urlPathOf(request);
  const pathParts = path.matchAll(/(?<=\/)[^\/]*/g);
  const rootPath = pathParts.next()?.value?.[0];
  const pathParam = pathParts.next()?.value?.[0];

  if(!rootPath) {
    respondWith404NotFound(response);
    return;
  }
  if (rootPath == 'ping'){
    routers[0].handle(request, response);
  }
  else if (rootPath == 'contacts'){
    if(pathParam) {
      request.pathParam = pathParam;
    }
    routers[1].handle(request, response);
  }
  else if (rootPath == 'contactDetails'){
    routers[2].handle(request, response);
  }
  else {
    respondWith404NotFound(response);
  }
//});
};
