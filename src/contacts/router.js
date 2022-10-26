const {
  queryParameter,respondWith200OkJson,filterByWordAndPageBySize,validateParameters,respondWith400BadRequestWithExplanation,respondWith204NoContent,respondWith404NotFound
} = require('../httpHelpers');
const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');

function handle(request, response) {
  const isValid = validateParameters(request);
  if(!isValid) {
    respondWith400BadRequestWithExplanation(response,"Request is not valid");
    return;
  }
  if(request.pathParam) {
    const id = request.pathParam;
    if(request.method === 'DELETE') {
      fakeDatabase.deleteContactsById(id);
      respondWith204NoContent(response);
      return routerHandleResult.HANDLED;
    }
    const res = fakeDatabase.selectFromContactsById(id);
    if(res.length > 0) {
      respondWith200OkJson(response, res[0]);
    }
    else {
      respondWith404NotFound(response);
    }
    return routerHandleResult.HANDLED;
  }
  const contacts = fakeDatabase.selectAllFromContacts();
  let filteredContacts = filterByWordAndPageBySize(contacts,request);

  respondWith200OkJson(response, filteredContacts);
  return routerHandleResult.HANDLED;
}

module.exports = {
  handle,
};
