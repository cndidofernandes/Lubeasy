export const parseQueryResult = (queryString) => {
  if (queryString.indexOf('#') > -1) {
    queryString = queryString.substr(0, queryString.indexOf('#'));
  }

  let queryParams = queryString.split('&');

  let parsedQuery = {};
  queryParams.forEach(qp => {
    let [key, val] = qp.split('=');
    parsedQuery[key] = decodeURIComponent(val);
  });

  return {
    ...parsedQuery,
    expires_in: parseInt(parsedQuery.expires_in)
  };
};



