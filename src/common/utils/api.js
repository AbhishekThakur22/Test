import {
  map,
  isEqual,
  isArray,
  trim,
  isNil,
  includes,
  isObject,
  isEmpty,
  get,
} from 'lodash';
import {observable} from 'mobx';
import {showToast} from '../utils';

export const apiResponse = observable({data: {}});
export const apiResponseStatus = observable({status: {}});

export const HTTP_ERROR = {
  OK: {CODE: 200, MESSAGE: 'success'},
  ERROR: {CODE: 400, MESSAGE: 'Error'},
  UNAUTHORIZED: {CODE: 401, MESSAGE: 'You have been logged out'},
  FORBIDDEN: {CODE: 403, MESSAGE: 'Access not allowed'},
  NOT_FOUND: {
    CODE: 404,
    MESSAGE: "We searched for your page everywhere. But, we can't find it.",
  },
  INTERNAL_SERVER: {CODE: 500, MESSAGE: 'Oops something bad has happened'},
};
const BASE_URL = 'https://api.myjson.com/';
const EMPTY_STRING = '';
const TOKEN_PREFIX = 'bearer';

const deleteEmptyValues = (body, excludedKeys = []) => {
  const updatedObj = body;
  Object.keys(updatedObj).forEach(key => {
    if (isNil(updatedObj[key]) || trim(updatedObj[key]) === EMPTY_STRING) {
      if (!includes(excludedKeys, key)) {
        delete updatedObj[key];
      } else {
        updatedObj[key] = null;
      }
    } else if (
      isObject(updatedObj[key]) &&
      !isArray(updatedObj[key]) &&
      !(updatedObj[key] instanceof Date)
    ) {
      updatedObj[key] = deleteEmptyValues(updatedObj[key], excludedKeys);
      if (isEmpty(updatedObj[key])) {
        delete updatedObj[key];
      }
    }
  });
  return updatedObj;
};

export async function fetchResponse(uri, params, extra) {
  try {
    const response = await fetch(uri, params);
    const contentType = response.headers.get('content-type');
    if (response.status === 204) {
      return {};
    }
    if (response.ok) {
      if (contentType === 'application/json') {
        if (extra) {
          return Promise.resolve({
            data: response.json(),
            extra: {statusCode: response.status},
          });
        }
        return response.json();
      }
      if (contentType.indexOf('text/html') === 0) {
        return response.text();
      }
      if (contentType.substring(0, 6) === 'image/') {
        return response.blob();
      }
      const responseJson = await response.json();
      console.log('Resp---o--------n-se', responseJson);
      // if (
      //   typeof responseJson === 'string' &&
      //   !isEqual(responseJson, 'Success')
      // ) {
      //   return JSON.parse(responseJson);
      // }
      return JSON.parse(responseJson);
    }
  } catch (err) {
    throw new Error(err);
  }
}
async function setAuthHeader(headers) {
  const newHeader = headers;
  // const token = await getToken()
  // if (token) {
  //   newHeader.Authorization = `${TOKEN_PREFIX} ${token}`
  // }
  return newHeader;
}

export async function api(
  uri,
  {
    headers = {},
    method = 'GET',
    body = {},
    shouldDeleteEmptyValues = true,
    excludedKeys = [],
  } = {},
  extra = false,
) {
  const params = {
    headers: await appendCommonHeader(headers),
    method,
  };
  let updatedBody = body;
  if (shouldDeleteEmptyValues) {
    updatedBody = deleteEmptyValues(body, excludedKeys);
  }
  if (!isEqual(params.method, 'GET')) {
    params.body = JSON.stringify(updatedBody);
  }

  try {
    const res = await fetchResponse(uri, params, extra);
    if (res) {
      apiResponse.data = res;
      return res;
    }
  } catch (err) {
    showToast({
      text: err.message,
      position: 'top',
      type: 'danger',
    });
    throw err;
  }
}

export function getDataFromResponse(jsonResponse) {
  if (get(jsonResponse, 'data')) {
    return jsonResponse.data;
  }
  return null;
}

export function getQueryString(options) {
  let queryString = '';
  let useQuestionConnector = true;
  if (options) {
    map(options, (value, prop) => {
      if (useQuestionConnector) {
        queryString += `?${prop}=${value}`;
        useQuestionConnector = false;
      } else {
        queryString += `&${prop}=${value}`;
      }
    });
  }
  return queryString;
}

export async function appendCommonHeader(headerOpts) {
  let headers = {
    Accept: 'application/json; version=1.0',
    'Content-Type': 'application/json',
    ...headerOpts,
  };
  headers = await setAuthHeader(headers);
  return headers;
}

export function getMappedUrl(
  urlTemplate = EMPTY_STRING,
  templateVars = [],
  queryParams = EMPTY_STRING,
  base = BASE_URL,
) {
  let mappedUrl = urlTemplate;
  templateVars.forEach((templateVar, index) => {
    mappedUrl = mappedUrl.replace(`$${index + 1}`, templateVar);
  });
  return `${base}/${mappedUrl}${getQueryString(queryParams)}`;
}
