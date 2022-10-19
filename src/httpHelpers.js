const url = require('url');

filterByWordAndPageBySize = (contacts,request) => {

  const parameters = queryParameter(request);

  const phrase = parameters.phrase;
  const size = parameters.limit;

  contacts.sort((a,b) => a.name.localeCompare(b.name));
  let res;

  if(phrase) {
    res = filterByWord(contacts,phrase);
  }
  if(size) {
    res = filterByPageBySize(res == null ? contacts : res,size);
  }
  // no filtering at all
  if(!res) {
    res = contacts;
  }
  return res;
},

filterByWord = (contacts,word) => {
  const res = contacts.filter(contact => contact.name.toLowerCase().includes(word.toLowerCase()));
  return res;
},
filterByPageBySize = (contacts,size) => {
  const res = contacts.slice(0,parseInt(size));
  return res;
}

queryParameter = (request) => url.parse(request.url,true).query;
pathParameter = (request) => url.parse(request.url).pathParameter;

module.exports = {
  urlPathOf: (request) => url.parse(request.url).pathname,

  respondWith200OkText: (response, textBody) => {
    response.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    response.end(textBody);
  },

  respondWith200OkJson: (response, jsonBody) => {
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify(jsonBody));
  },

  respondWith404NotFound: (response) => {
    response.writeHead(404);
    response.end();
  },

  respondWith400BadRequestWithExplanation: (response,cause) => {
    response.writeHead(400);
    response.end(cause);
  },

  filterByWordAndPageBySize,

  validateParameters:(request) => {
    const parameters = queryParameter(request);

    const phraseParam = parameters.phrase;
    const limitParam = parameters.limit;

    if( (request.url.includes("phrase") && !phraseParam) || (request.url.includes("limit") && isNaN(parseInt(limitParam))) ) {
      return false;
    }
    return true;
  }
};
