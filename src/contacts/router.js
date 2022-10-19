const {
  queryParameter,respondWith200OkJson,filterByWordAndPageBySize,validateParameters,respondWith400BadRequestWithExplanation
} = require('../httpHelpers');
const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');

function handle(request, response) {
  const contacts = fakeDatabase.selectAllFromContacts();
  const isValid = validateParameters(request);
  if(!isValid) {
    respondWith400BadRequestWithExplanation(response,"Request is not valid");
    return;
  }
  let filteredContacts = filterByWordAndPageBySize(contacts,request);

  respondWith200OkJson(response, filteredContacts);
  return routerHandleResult.HANDLED;
}

module.exports = {
  handle,
};
