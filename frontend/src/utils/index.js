/**
 * Network request configuration
 */
import axios from "axios";

axios.defaults.timeout = 100000;
// The local proxy does not set the request url
// axios.defaults.baseURL = "";

/**
 * http request interceptor
 */
axios.interceptors.request.use(
  (config) => {
    // config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response interceptor
 */
axios.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 2) {
      console.log("expire");
    }
    return response;
  },
  (error) => {
    console.log("Request error：", error);
  }
);

/**
 * Encapsulated get method
 * @param url  Request url
 * @param params  Request parameter
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params,
      }).then((response) => {
        landing(url, params, response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Encapsulated post request
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  console.log(data,'data');
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        //Close the progress bar
        console.log(response,'response');
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * Encapsulated patch request
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * Encapsulate put request
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

//Unified interface processing, return data
// eslint-disable-next-line import/no-anonymous-default-export
export default function (fecth, url, param) {
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        console.log("begin a get request,and url:", url);
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request GET failed.", error);
            reject(error);
          });
        break;
      case "post":
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request POST failed.", error);
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}

//Failure prompt
function msag(err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert("No authorization, please log in");
        break;

      case 403:
        alert("Deny access");
        break;

      case 404:
        alert("Request address error");
        break;

      case 408:
        alert("Request timeout");
        break;

      case 500:
        alert("Server internal error");
        break;

      case 501:
        alert("Service not implemented");
        break;

      case 502:
        alert("Gateway error");
        break;

      case 503:
        alert("Service is unavailable");
        break;

      case 504:
        alert("Gateway timeout");
        break;

      case 505:
        alert("HTTP versions are not supported");
        break;
      default:
    }
  }
}

/**
 * View the returned data
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
  if (data.code === -1) {
  }
}


