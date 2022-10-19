const { respondWith200OkText } = require('../httpHelpers');
const { routerHandleResult } = require('../routerHandleResult');

function handle(request, response) {
  if (request.method !== 'GET') {
    return routerHandleResult.NO_HTTP_METHOD_MATCH;
  }
  respondWith200OkText(response, 'pong');
  return routerHandleResult.HANDLED;
}

module.exports = {
  handle,
};
