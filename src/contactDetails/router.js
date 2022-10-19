const {
  respondWith200OkText,
} = require('../httpHelpers');

const { routerHandleResult } = require('../routerHandleResult');

function handle(request, response) {
  respondWith200OkText(response, 'contactDetails');
  return routerHandleResult.HANDLED;
}

module.exports = {
  handle,
};
