import {stringifyQueryParams} from './urlutils';
const defaultHeaders = {
  "Content-Type": "application/json"
};

function request(res) {
  return Promise.resolve(res)
    .then(response => {
      if (response.ok && !response.error) {
        const contentType = response.headers.get("content-type");
        if (response.error) {
          return Promise.reject(response.error);
        }
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return Promise.resolve(response.json());
        }
        return Promise.resolve(response.text());
      } else {
        return response
          .json()
          .then(error =>
            Promise.reject({ status: response.status, response: error })
          );
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

const fireRequest = (url, config) => {
  let conf = {
    ...config,
    headers: {
      ...defaultHeaders,
      ...config.headers
    }
  };

  if (conf.headers["Content-Type"] === undefined) {
    delete conf.headers["Content-Type"];
  }
  return fetch(url, conf)
    .then(res => {
      return res;
    })
    .then(request);
};

export default {
  get(url, requestParams, config) {
    url += stringifyQueryParams(requestParams);
    return fireRequest(
      url,
      Object.assign(
        {
          method: "get"
        },
        config
      )
    );
  },
  put(url, data, config) {
    return fireRequest(
      url,
      Object.assign(
        {
          method: "put",
          body: JSON.stringify(data)
        },
        config
      )
    );
  },
  post(url, data, config = {}) {
    return fireRequest(
      url,
      Object.assign(
        {
          method: "post",
          body: config.formData ? data : JSON.stringify(data)
        },
        config
      )
    );
  },
  delete(url, config) {
    return fireRequest(
      url,
      Object.assign(
        {
          method: "delete"
        },
        config
      )
    );
  }
};